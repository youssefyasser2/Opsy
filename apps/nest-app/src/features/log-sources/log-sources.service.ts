import { Injectable } from '@nestjs/common';
import { CreateLogSourceDto } from './dto/create-log-source.dto';
import { UpdateLogSourceDto } from './dto/update-log-source.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LogSource } from './entities/log-source.entity';
import { Repository } from 'typeorm';
import { LogSourcesStatus } from './enums/log-sources-status.enum';

@Injectable()
export class LogSourcesService {
  constructor(
    @InjectRepository(LogSource)
    private readonly repo: Repository<LogSource>,
  ) {}
  create(createLogSourceDto: CreateLogSourceDto, ownerId: string) {
    const logSource = this.repo.create({
      ...createLogSourceDto,
      ownerId,
      status: LogSourcesStatus.PENDING,
    });
    return this.repo.save(logSource);
  }

  findAll(ownerId: string) {
    return this.repo.find({ where: { ownerId } });
  }

  async findOne(id: string, ownerId: string) {
    return this.repo.findOneBy({
      id,
      ownerId,
    });
  }

  async findOneById(id: string) {
    const logSource = await this.repo.findOneBy({ id, ownerId: id });
    if (!logSource) {
      throw new Error(`Log source with ID ${id} not found`);
    }
    return logSource;
  }

  async update(
    id: string,
    updateLogSourceDto: UpdateLogSourceDto,
    ownerId: string,
  ) {
    await this.repo.update({ id, ownerId }, updateLogSourceDto);

    return this.repo.findOneBy({
      id,
      ownerId,
    });
  }

  async remove(id: string, ownerId: string) {
    return this.repo.delete({
      id,
      ownerId,
    });
  }
}
