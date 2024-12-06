CREATE OR REPLACE VIEW get_current_stock AS
SELECT
    r.id AS restaurantid,
    p.id AS productid,
    COALESCE(SUM(CASE
                     WHEN rs.subId IS NULL AND (rs.expirationDate IS NULL OR rs.expirationDate >= CURRENT_DATE) THEN rs.amount
                     WHEN rs.subId IS NOT NULL THEN -rs.amount
                     ELSE 0.0
        END), 0.0) AS totalamount
FROM restaurants r
         CROSS JOIN products p
         LEFT JOIN restaurantstock rs ON r.id = rs.restaurantid AND p.id = rs.productid
GROUP BY r.id, p.id ;


