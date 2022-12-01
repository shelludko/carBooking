import { Module } from '@nestjs/common';
import { BookingsModule } from './bookings/bookings.module';
import { DatabaseModule } from './database/database.module';
import { RatesModule } from './rates/rates.module';

@Module({
  imports: [DatabaseModule, RatesModule, BookingsModule],
})
export class AppModule {}
