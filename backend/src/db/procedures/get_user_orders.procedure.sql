-- get_user_orders procedure
CREATE OR REPLACE FUNCTION get_user_orders(user_id INT)
RETURNS TABLE (
    order_id INT,
    restaurant_id INT,
    total_price NUMERIC(12, 4),
    status VARCHAR(20),
    created_at TIMESTAMP,
    edited_at TIMESTAMP,
    dish_names TEXT
) AS $$
BEGIN
    -- Check if user exists
    IF NOT EXISTS (SELECT 1 FROM turbbbites.users WHERE id = user_id) THEN
        RAISE EXCEPTION 'User with id % does not exist', user_id;
    END IF;

    -- Retrieve orders for the user
    RETURN QUERY
    SELECT o.id, 
           o.restaurantid,
           o.totalprice,
           o.status, 
           o.createdat,
           o.editedat,
           STRING_AGG(d.name, ', ') AS dish_names
    FROM turbbbites.orders o
    JOIN turbbbites.orderitem od ON o.id = od.orderid
    JOIN turbbbites.dishes d ON od.dishid = d.id
    WHERE o.userid = user_id
    GROUP BY o.id, o.restaurantid, o.totalprice, o.status, o.createdat, o.editedat
    ORDER BY o.createdat DESC;
END;
$$ LANGUAGE plpgsql;