-- ======================================================
-- Function for adding a product
-- ======================================================
CREATE OR REPLACE PROCEDURE insert_to_products(
    product_category_id INT DEFAULT NULL,
    product_name VARCHAR(50),
    product_description TEXT DEFAULT NULL,
    product_active BOOLEAN DEFAULT FALSE
    )
    LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO products (
        productcategoryid, name, description, active
    )
    VALUES (product_category_id, product_name, product_description, product_active);
END;
$$;