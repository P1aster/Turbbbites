-- ======================================================
-- Procedure to update product category data
-- ======================================================
CREATE OR REPLACE PROCEDURE update_product_category(
    _id INT,
    new_name VARCHAR(50)
)
    LANGUAGE plpgsql AS $$
BEGIN
    UPDATE productcategory
    SET name = new_name
    WHERE id = _id;
END;
$$;