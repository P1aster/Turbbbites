-- ======================================================
-- Function to get user orders
-- ======================================================
CREATE OR REPLACE FUNCTION get_user_orders(user_id INT)
    RETURNS TABLE (
                      id INT,
                      restaurant_id INT,
                      total_price NUMERIC(12, 4),
                      status VARCHAR(20),
                      created_at TIMESTAMP,
                      edited_at TIMESTAMP,
                      dish_names TEXT
                  ) AS $$
BEGIN
    -- Check if user exists
    IF NOT EXISTS (SELECT 1 FROM users WHERE users.id = user_id) THEN
        RAISE EXCEPTION 'User with id % does not exist', user_id;
    END IF;

    RETURN QUERY
        SELECT orders.id,
               orders.restaurantid,
               orders.totalprice,
               orders.status,
               orders.createdat,
               orders.editedat,
               (SELECT STRING_AGG(dishes.name, ', ')
                FROM orderitem
                JOIN dishes ON orderitem.dishid = dishes.id
                WHERE orderitem.orderid = orders.id) AS dish_names
        FROM orders
        WHERE orders.userid = user_id
        ORDER BY orders.createdat DESC;
END;
$$ LANGUAGE plpgsql;