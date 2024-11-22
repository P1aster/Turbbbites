import { Module } from '@nestjs/common';
import { DbService } from '@/db/db.service';
import { databaseProviders } from '@/db/db.providers';

@Module({
  providers: [DbService, ...databaseProviders],
  exports: [DbService],
})
export class DbModule {}
