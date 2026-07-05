import { Injectable } from '@nestjs/common';

type DependencyMap = Record<string, string>;

const DATABASE_CANDIDATES: Array<[string, string]> = [
  ['pg', 'PostgreSQL'],
  ['postgres', 'PostgreSQL'],
  ['mysql2', 'MySQL'],
  ['mariadb', 'MariaDB'],
  ['sqlite3', 'SQLite'],
  ['better-sqlite3', 'SQLite'],
  ['mongodb', 'MongoDB'],
];

@Injectable()
export class DatabaseDetector {
  detect(dependencies: DependencyMap): string | null {
    for (const [pkg, database] of DATABASE_CANDIDATES) {
      if (dependencies[pkg]) {
        return database;
      }
    }

    return null;
  }
}
