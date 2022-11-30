import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { DiscountDTO } from 'src/discounts/discount.dto';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingService: BookingsService) {}

  @Get()
  @HttpCode(200)
  async getBookings() {
    return await this.bookingService.getBookings();
  }

  @Post()
  @HttpCode(201)
  async createBooking(@Body() discountDto: DiscountDTO) {
    return await this.bookingService.createBooking(discountDto);
  }
}
