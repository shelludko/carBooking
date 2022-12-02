import { Pool } from 'pg';

export const PG_CONNECTION = 'PG_CONNECTION';

export const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB || 'booking_db',
  }),
};

export const MAX_RENTAL_PERIOD = 30;
export const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const START_SERVER = (port: string | number) => {
  console.log(
    '----------------------------------------------------------------',
  );
  console.log(
    `🚀 Server started on port: ${port} 🔥🔥🔥 All code in project is 👍`,
  );
  console.log(
    '----------------------------------------------------------------',
  );
};
