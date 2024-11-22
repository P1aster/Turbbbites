-- ======================================================
-- Function for adding a product
-- ======================================================
CREATE OR REPLACE PROCEDURE insert_to_products(
    _productcategoryid INT DEFAULT NULL,
    _name VARCHAR(50),
    _description TEXT DEFAULT NULL,
    _active BOOLEAN DEFAULT FALSE
    )
    LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO products (
        productcategoryid, name, description, active
    )
    VALUES (_productcategoryid, _name, _description, _active);
END;
$$;