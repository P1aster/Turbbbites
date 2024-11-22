import { Provider } from '@nestjs/common';
import { Pool } from 'pg';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: parseInt(process.env.POSTGRES_PORT, 10),
      });
      return pool;
    },
  },
];
