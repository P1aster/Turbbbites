-- ======================================================
-- Procedure to update product data
-- ======================================================
CREATE OR REPLACE PROCEDURE update_product(
    product_id INT,
    product_category_id INT DEFAULT NULL,
    product_name VARCHAR(50) DEFAULT NULL,
    product_description TEXT DEFAULT NULL,
    product_active BOOLEAN DEFAULT NULL
)
    LANGUAGE plpgsql AS $$
BEGIN
    UPDATE products
    SET productcategoryid = COALESCE(product_category_id, productcategoryid),
        name = COALESCE(product_name, name),
        description = COALESCE(product_description, description),
        active = COALESCE(product_active, active)
    WHERE id = product_id;
END;
$$;