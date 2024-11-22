import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DbService {
  loadSQL(fileName: string): string {
    const filePath = path.join(__dirname, '..', 'sql', fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`SQL file ${fileName} not found at ${filePath}`);
    }
    return fs.readFileSync(filePath, 'utf-8');
  }
}
