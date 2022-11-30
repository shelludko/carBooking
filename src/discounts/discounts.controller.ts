import { DiscountsService } from './discounts.service';
import { Body, Controller, Get, HttpCode } from '@nestjs/common';
import { DiscountDTO } from './discount.dto';

@Controller('discounts')
export class DiscountsController {
  constructor(private discountService: DiscountsService) {}

  @Get()
  @HttpCode(200)
  async getBookings(@Body() dto: DiscountDTO) {
    return await this.discountService.getRentalDuration(dto);
  }
}
