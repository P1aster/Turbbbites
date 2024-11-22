-- ======================================================
-- Function for adding a product category
-- ======================================================
CREATE OR REPLACE PROCEDURE insert_to_product_category(
    new_name VARCHAR(50)
)
    LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO productcategory (
        name
    )
    VALUES (new_name);
END;
$$;