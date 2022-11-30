import { DiscountsModule } from './../discounts/discounts.module';
import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, DiscountsModule],
  providers: [BookingsService],
  controllers: [BookingsController],
  exports: [],
})
export class BookingsModule {}
