import { Injectable } from '@nestjs/common';

type DependencyMap = Record<string, string>;

const ORM_CANDIDATES: Array<[string, string]> = [
    ['typeorm', 'TypeORM'],
    ['prisma', 'Prisma'],
    ['sequelize', 'Sequelize'],
    ['mongoose', 'Mongoose'],
    ['drizzle-orm', 'Drizzle ORM'],
];

@Injectable()
export class OrmDetector {
    detect(dependencies: DependencyMap): string | null {
        for (const [pkg, orm] of ORM_CANDIDATES) {
            if (dependencies[pkg]) {
                return orm;
            }
        }

        return null;
    }
}
