import { Pool } from 'pg';

export const PG_CONNECTION = 'PG_CONNECTION';

export const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'bookingDb',
  }),
};
