import {
  BadRequestException,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  CAR_IS_FREE,
  CAR_REPORT,
  CREATE_BOOKING,
  SELECT_ALL_BOKKINGS,
} from 'src/queries';
import { MAX_RENTAL_PERIOD, MS_PER_DAY, PG_CONNECTION } from '../constants';
import { RatesService } from './../rates/rates.service';
import { CreateBookingDTO } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @Inject(PG_CONNECTION) private connection: any,
    private rateService: RatesService,
  ) {}

  async getBookings() {
    const result = await this.connection.query(SELECT_ALL_BOKKINGS);
    return result.rows;
  }

  async rateCalculation(days: number, rate: any) {
    const basePeriod = rate[0].start_day - 1;
    const basePrice = rate[0].price;
    const initialValue = Math.min(basePeriod, days) * basePrice;

    if (days < rate[0].start_day) {
      return initialValue;
    }

    const totalPrice = rate.reduce((accum: number, value: any) => {
      if (value.start_day > days) {
        return accum;
      }

      const discountDays = value.end_day - value.start_day + 1;
      const uncalcDays = days - value.start_day + 1;
      const discountPercentValue = value.price * (value.percent / 100);
      const discountValue = value.price - discountPercentValue;
      const price = Math.min(uncalcDays, discountDays) * discountValue;

      return accum + price;
    }, initialValue);

    const extraDays = Math.max(days - rate.at(-1).end_day, 0) * basePrice;
    return totalPrice + extraDays;
  }

  async carIsFree(startDay: Date, endDay: Date): Promise<boolean> {
    const bookedCar = await this.connection.query(CAR_IS_FREE, [
      startDay,
      endDay,
    ]);

    return !bookedCar.rows.length;
  }

  async createBooking(dto: CreateBookingDTO) {
    const rate = await this.rateService.getRate();

    const startDate = new Date(dto.startDay);
    const startDayOfWeek = startDate.getDay();

    if (startDayOfWeek === 6 || startDayOfWeek === 0) {
      throw new BadRequestException('Start day or end day can not be weekend');
    }

    const endDate = new Date(dto.endDay);
    const endDayOfWeek = endDate.getDay();

    if (endDayOfWeek === 6 || endDayOfWeek === 0) {
      throw new BadRequestException('Start day or end day can not be weekend');
    }

    const durationMilliseconds = endDate.valueOf() - startDate.valueOf();
    const duration = Math.ceil(durationMilliseconds / MS_PER_DAY);

    if (duration > MAX_RENTAL_PERIOD) {
      throw new BadRequestException(
        `Max rental period is ${MAX_RENTAL_PERIOD}`,
      );
    }

    const carIsFree = await this.carIsFree(startDate, endDate);

    if (!carIsFree) {
      throw new UnprocessableEntityException('Car is booked');
    }

    const price = await this.rateCalculation(duration, rate);

    await this.connection.query(CREATE_BOOKING, [
      dto.carId,
      dto.userId,
      startDate,
      endDate,
      price,
    ]);
    return;
  }

  async getCarReport(carId: number) {
    const result = await this.connection.query(CAR_REPORT, [carId]);
    return result.rows;
  }
}
