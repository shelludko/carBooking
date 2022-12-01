import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RatesModule } from './../rates/rates.module';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

@Module({
  imports: [DatabaseModule, RatesModule],
  providers: [BookingsService],
  controllers: [BookingsController],
  exports: [],
})
export class BookingsModule {}
