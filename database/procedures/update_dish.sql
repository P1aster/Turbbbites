-- ======================================================
-- Procedure to update dish data and its ingredients
-- ======================================================
CREATE OR REPLACE PROCEDURE update_dish(
    _id INT,
    _product_ids_to_delete INT[],
    _products_to_add JSONB[],
    _name VARCHAR(50) DEFAULT NULL,
    _description TEXT DEFAULT NULL,
    _price NUMERIC DEFAULT NULL,
    _available BOOLEAN DEFAULT NULL
)
    LANGUAGE plpgsql AS $$
DECLARE
    product JSONB;
    product_element JSONB;
BEGIN
    -- Update dish data
    UPDATE Dishes
    SET name = COALESCE(_name, name),
        description = COALESCE(_description, description),
        price = COALESCE(_price, price),
        available = COALESCE(_available, available),
        editedat = NOW()::DATE
    WHERE id = _id;

    -- Delete specified product_ids from Dishingredients
    DELETE FROM Dishingredients WHERE dishid = _id AND productid = ANY(_product_ids_to_delete);

    -- Insert new records into Dishingredients
    FOREACH product IN ARRAY _products_to_add LOOP
            FOR product_element IN SELECT * FROM jsonb_array_elements(product) LOOP
                    INSERT INTO dishingredients (dishid, productid, amount)
                    VALUES (_id, (product_element->>'id')::INT, (product_element->>'amount')::NUMERIC);
                END LOOP;
        END LOOP;
END;
$$;

