-- ======================================================
-- Procedure to update product category data
-- ======================================================
CREATE OR REPLACE PROCEDURE update_product_category(
    _id INT,
    _name VARCHAR(50)
)
    LANGUAGE plpgsql AS $$
BEGIN
    UPDATE productcategory
    SET name = _name
    WHERE id = _id;
END;
$$;