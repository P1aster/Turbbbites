-- ======================================================
-- Function to get sales report
-- ======================================================
CREATE OR REPLACE FUNCTION get_sales_report(
    start_date DATE,
    end_date DATE
)
    RETURNS TABLE (
        restaurant_id INT,
        total_sales NUMERIC(20, 4),
        total_orders INT
    ) AS $$
BEGIN


    RETURN QUERY
        SELECT restaurantid,
               SUM(totalprice)::NUMERIC(20, 4) AS total_sales,
               COUNT(id)::INTEGER AS total_orders
        FROM Orders
        WHERE createdat BETWEEN start_date AND end_date
        GROUP BY restaurantid
        ORDER BY total_sales DESC;
END;
$$ LANGUAGE plpgsql;