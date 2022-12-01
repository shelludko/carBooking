import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { GET_RATE } from 'src/queries';

@Injectable()
export class RatesService {
  constructor(@Inject(PG_CONNECTION) private connection: any) {}

  async getRate() {
    const result = await this.connection.query(GET_RATE);
    return result.rows;
  }
}
