CREATE OR REPLACE FUNCTION get_restaurant_open_hours(restaurant_id INT)
    RETURNS TABLE (
                      id INT,
                      day_date DATE,
                      open_time TIME,
                      close_time TIME,
                      is_closed BOOLEAN
                  ) AS $$
BEGIN
    -- Check if restaurant exists
    IF NOT EXISTS (SELECT 1 FROM restaurants WHERE restaurants.id = restaurant_id) THEN
        RAISE EXCEPTION 'Restaurant with id % does not exist', restaurant_id;
    END IF;
    
    RETURN QUERY
        WITH current_week_dates AS (
            -- Step 1: Get all dates for the current week
            SELECT generate_series(
                           date_trunc('week', CURRENT_DATE),
                           date_trunc('week', CURRENT_DATE) + interval '6 days',
                           '1 day'::interval
                   )::date AS day_date
        ),
             business_hours_with_dates AS (
                 -- Step 2: Expand BusinessHours to include the actual date
                 SELECT
                     bh.id AS business_hour_id,
                     bh.RestaurantId,
                     cwd.day_date,
                     bh.openTime,
                     bh.closeTime,
                     bh.isClosed
                 FROM
                     BusinessHours bh
                         JOIN current_week_dates cwd
                              ON EXTRACT(ISODOW FROM cwd.day_date) = bh.dayOfWeek
             ),
             special_hours_filtered AS (
                 -- Step 3: Get SpecialHours for the current week
                 SELECT
                     sh.*
                 FROM
                     SpecialHours sh
                 WHERE
                     sh.dayDate BETWEEN date_trunc('week', CURRENT_DATE)
                         AND date_trunc('week', CURRENT_DATE) + interval '6 days'
             )
        SELECT
            r.id,
            bhwd.day_date,
            COALESCE(sh.openTime, bhwd.openTime) AS open_time,
            COALESCE(sh.closeTime, bhwd.closeTime) AS close_time,
            COALESCE(sh.isClosed, bhwd.isClosed) AS is_closed
        FROM
            restaurants r
                JOIN
            business_hours_with_dates bhwd ON r.id = bhwd.RestaurantId
                LEFT JOIN
            special_hours_filtered sh ON r.id = sh.RestaurantId AND bhwd.day_date = sh.dayDate
        WHERE
            r.id = restaurant_id
        UNION ALL
        SELECT
            r.id,
            sh.dayDate AS day_date,
            sh.openTime AS open_time,
            sh.closeTime AS close_time,
            sh.isClosed AS is_closed
        FROM
            restaurants r
                JOIN
            special_hours_filtered sh ON r.id = sh.RestaurantId
        WHERE
            r.id = restaurant_id;

END;
$$ LANGUAGE plpgsql;