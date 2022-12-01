export const SELECT_ALL_BOKKINGS = `SELECT id FROM bookings`;

export const CAR_IS_FREE = `
       SELECT id
       FROM bookings
       WHERE (start_date - INTERVAL '3 days' <= $1 AND end_date + INTERVAL '3 days' >= $1) 
       OR (start_date - INTERVAL '3 days' <= $2 AND end_date + INTERVAL '3 days' >= $2)
       LIMIT 1`;

export const CREATE_BOOKING = `INSERT INTO bookings (car_id, user_id, start_date, end_date, price) VALUES ($1, $2, $3, $4, $5)`;

export const CAR_REPORT = `SELECT DISTINCT
  t."carId",
  (
   SUM(
   CASE
     WHEN date_part('month',b.start_date) = t.month AND date_part('year',b.start_date) = t.year AND date_part('month', b.end_date) = t.month AND date_part('year', b.end_date) = t.year THEN extract(day from b.end_date) - extract(day from b.start_date)
     WHEN date_part('month', b.start_date) = t.month AND date_part('year', b.start_date) = t.year AND date_part('month', b.end_date) != t.month AND date_part('year', b.end_date) != t.year THEN extract(day from b.start_date) - 1
     WHEN date_part('month', b.start_date) != t.month AND date_part('year', b.start_date) != t.year AND date_part('month', b.end_date) = t.month AND date_part('year', b.end_date) = t.year THEN t."daysInMonth" - extract(day from b.end_date) + 1
   END
   )
   / t."daysInMonth" * 100) AS "percentOfUsage",
  t.month,
  t.year
FROM (SELECT
  car_id AS "carId",
  date_part('month', start_date) AS "month",
  date_part('year', start_date) AS "year",
  date_part('days', (date_trunc('month', start_date) + interval '1 month - 1 day')) AS "daysInMonth"
FROM bookings
WHERE car_id = $1
INTERSECT
SELECT
  car_id AS "carId",
  date_part('month', end_date) AS "month",
  date_part('year', end_date) AS "year",
  date_part('days', (date_trunc('month', start_date) + interval '1 month - 1 day')) AS "daysInMonth"
FROM bookings
WHERE car_id = $1) AS t
LEFT JOIN bookings b ON b.car_id = t."carId"
GROUP BY t."carId", t.month, t.year, t."daysInMonth"`;

export const GET_RATE = `SELECT * FROM rates LEFT JOIN discounts ON discounts.rate_id = rates.id;`;
