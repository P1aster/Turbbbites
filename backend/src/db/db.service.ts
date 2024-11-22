import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DbService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly pool: Pool) {}

  loadSQL(fileName: string): string {
    const filePath = path.join(__dirname, '..', 'sql', fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`SQL file ${fileName} not found at ${filePath}`);
    }
    return fs.readFileSync(filePath, 'utf-8');
  }
}
