import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RatesService } from './rates.service';

@Module({
  imports: [DatabaseModule],
  providers: [RatesService],
  controllers: [],
  exports: [RatesService],
})
export class RatesModule {}
