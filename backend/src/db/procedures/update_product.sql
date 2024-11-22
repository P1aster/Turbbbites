-- ======================================================
-- Procedure to update product data
-- ======================================================
CREATE OR REPLACE PROCEDURE update_product(
    _id INT,
    _categoryid INT DEFAULT NULL,
    _name VARCHAR(50) DEFAULT NULL,
    _description TEXT DEFAULT NULL,
    _active BOOLEAN DEFAULT NULL
)
    LANGUAGE plpgsql AS $$
BEGIN
    UPDATE products
    SET productcategoryid = COALESCE(_categoryid, productcategoryid),
        name = COALESCE(_name, name),
        description = COALESCE(_description, description),
        active = COALESCE(_active, active)
    WHERE id = _id;
END;
$$;