import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectSnapshot } from '../entities/project-snapshot.entity';

export interface ProjectSnapshotPayload {
    projectName?: string | null;
    language?: string | null;
    framework?: string | null;
    frameworkVersion?: string | null;
    runtime?: string | null;
    runtimeVersion?: string | null;
    packageManager?: string | null;
    database?: string | null;
    orm?: string | null;
    docker?: boolean | null;
    operatingSystem?: string | null;
    evidence: Record<string, unknown>;
}

@Injectable()
export class SnapshotService {
    constructor(
        @InjectRepository(ProjectSnapshot)
        private readonly projectSnapshotsRepository: Repository<ProjectSnapshot>,
    ) { }

    async upsert(agentId: string, payload: ProjectSnapshotPayload) {
        const existing = await this.projectSnapshotsRepository.findOne({
            where: { agentId },
        });

        if (!existing) {
            const snapshot = this.projectSnapshotsRepository.create({
                agentId,
                version: 1,
                ...payload,
            });

            return this.projectSnapshotsRepository.save(snapshot);
        }

        existing.version += 1;
        existing.projectName = payload.projectName ?? null;
        existing.language = payload.language ?? null;
        existing.framework = payload.framework ?? null;
        existing.frameworkVersion = payload.frameworkVersion ?? null;
        existing.runtime = payload.runtime ?? null;
        existing.runtimeVersion = payload.runtimeVersion ?? null;
        existing.packageManager = payload.packageManager ?? null;
        existing.database = payload.database ?? null;
        existing.orm = payload.orm ?? null;
        existing.docker = payload.docker ?? null;
        existing.operatingSystem = payload.operatingSystem ?? null;
        existing.evidence = payload.evidence;

        return this.projectSnapshotsRepository.save(existing);
    }

    async findByAgentId(agentId: string) {
        const snapshot = await this.projectSnapshotsRepository.findOne({
            where: { agentId },
        });

        if (!snapshot) {
            throw new NotFoundException('Project snapshot not found');
        }

        return snapshot;
    }

    async findByAgentIdOrNull(agentId: string) {
        const snapshot = await this.projectSnapshotsRepository.findOne({
            where: { agentId },
        });

        return snapshot ?? null;
    }
}
