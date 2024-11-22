-- ======================================================
-- Function for adding a product category
-- ======================================================
CREATE OR REPLACE PROCEDURE insert_to_product_category(
    _name VARCHAR(50)
)
    LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO productcategory (
        name
    )
    VALUES (_name);
END;
$$;