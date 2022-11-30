import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import { DiscountsService } from '../discounts/discounts.service';
import { DiscountDTO } from '../discounts/discount.dto';

@Injectable()
export class BookingsService {
  constructor(
    @Inject(PG_CONNECTION) private connection: any,
    private discountService: DiscountsService,
  ) {}

  async getBookings() {
    const result = await this.connection.query('SELECT * FROM bookings');
    return result.rows;
  }

  async createBooking(discountDto: DiscountDTO) {
    const rateId = 1;
    const userId = 1;
    const carId = 1;
    // const ratePrice = await this.connection.query(
    //   `SELECT price FROM rates WHERE id=${rateId}`,
    // );
    const ratePrice = 1000;
    const duration = await this.discountService.getRentalDuration(discountDto);
    const result = await this.connection.query(
      `INSERT INTO bookings (user_id, car_id, duration, price) VALUES (${userId}, ${carId}, ${duration}, ${ratePrice})`,
    );
    return result;
  }
}
