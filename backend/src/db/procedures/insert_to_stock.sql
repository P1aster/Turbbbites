-- ======================================================
-- Function for adding a product to the stock
-- ======================================================
CREATE OR REPLACE PROCEDURE insert_to_stock(
    restaurant_id INT,
    product_id INT,
    product_amount NUMERIC(18, 6),
    modification_datetime timestamp DEFAULT NOW()::timestamp,
    expiration_date DATE DEFAULT NULL
)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO restaurantstock (
        restaurantid, productid, amount, expirationdate, modificationdatetime, stockaction
    )
    VALUES (restaurant_id, product_id, product_amount, expiration_date, modification_datetime, 'add');
END;
$$;