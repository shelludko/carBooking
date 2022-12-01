import {
  Body,
  Controller,
  Get,
  HttpCode,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDTO } from './dto/create-booking.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private bookingService: BookingsService) {}

  @ApiOperation({ summary: 'Get bookings' })
  @ApiResponse({ status: 200 })
  @Get()
  @HttpCode(200)
  async getBookings() {
    return await this.bookingService.getBookings();
  }

  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: 200 })
  @Get('report')
  @HttpCode(200)
  async getCarReport(@Query('carId', ParseIntPipe) carId: number) {
    return await this.bookingService.getCarReport(carId);
  }

  @ApiOperation({ summary: 'Create booking' })
  @ApiResponse({ status: 201 })
  @Post()
  @HttpCode(201)
  async createBooking(@Body() dto: CreateBookingDTO) {
    return await this.bookingService.createBooking(dto);
  }
}
