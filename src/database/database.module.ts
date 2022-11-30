import { Module } from '@nestjs/common';
import { dbProvider } from '../constants';

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule {}
