import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RatesController } from './rates.controller';

@Module({
  providers: [RatesService],
  controllers: [RatesController],
})
export class RatesModule {}
