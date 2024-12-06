CREATE OR REPLACE VIEW get_dishes AS
SELECT DISTINCT cs.restaurantid, di.dishid, d.name, d.description, d.price, d.createdat, dc.name as category, d.available,
                CASE
                    WHEN d.available = FALSE THEN FALSE
                    WHEN COUNT(*) = SUM(CASE WHEN di.amount <= cs.totalamount THEN 1 ELSE 0 END) THEN TRUE
                    ELSE FALSE
                    END AS onstock
FROM dishingredients di
         JOIN dishes d ON di.dishid = d.id
         JOIN get_current_stock cs ON di.productid = cs.productid
         LEFT JOIN dishcategory dc ON d.dishcategoryid = dc.id
GROUP BY cs.restaurantid, di.dishid, d.name, d.description, d.price, d.createdat, dc.name, d.available;

