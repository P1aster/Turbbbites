CREATE OR REPLACE FUNCTION get_restaurant_dishes(restaurant_id INT)
    RETURNS TABLE(
        dishid INTEGER, name VARCHAR(50), description TEXT, price NUMERIC, createdat DATE, category VARCHAR(50), onstock BOOLEAN
 ) AS $$
BEGIN

    -- Check if restaurant exists
    IF NOT EXISTS (SELECT 1 FROM get_dishes WHERE restaurantid = restaurant_id) THEN
        RAISE EXCEPTION 'Restaurant with id % does not exist', restaurant_id;
    END IF;

    RETURN QUERY
        SELECT gd.dishid, gd.name, gd.description, gd.price, gd.createdat, gd.category, gd.onstock
        FROM get_dishes gd
        WHERE gd.available = TRUE AND gd.restaurantid = restaurant_id;
END;
$$ LANGUAGE plpgsql;


