import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import { DiscountDTO } from './discount.dto';

@Injectable()
export class DiscountsService {
  constructor(@Inject(PG_CONNECTION) private connection: any) {}

  async getRentalDuration(dto: DiscountDTO) {
    const id = dto.id;
    const startDay = await this.connection.query(
      `SELECT start_day AS startDay FROM discounts WHERE id=${id}`,
    );
    const endDay = await this.connection.query(
      `SELECT end_day FROM discounts WHERE id=${id}`,
    );
    const duration = endDay.rows[0].end_day - startDay.rows[0].start_day + 1;
    console.log(duration);
    return duration;
  }
}
