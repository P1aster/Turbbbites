-- ======================================================
-- Function for adding a product to the stock
-- ======================================================
CREATE OR REPLACE PROCEDURE insert_to_stock(
    _restaurantid INT,
    _productid INT,
    _amount NUMERIC,
    _expirationdate DATE DEFAULT NULL
)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO restaurantstock (
        restaurantid, productid, amount, expirationdate, modificationdatetime, stockaction
    )
    VALUES (_restaurantid, _productid, _amount, _expirationdate, NOW()::timestamp, 'add');
END;
$$;