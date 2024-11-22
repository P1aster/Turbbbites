-- ======================================================
-- Procedure to update dish data and its ingredients
-- ======================================================
CREATE OR REPLACE PROCEDURE update_dish(
    _id INT,
    product_ids_to_delete INT[],
    products_to_add JSONB[],
    new_name VARCHAR(50) DEFAULT NULL,
    new_description TEXT DEFAULT NULL,
    new_price NUMERIC(12,4) DEFAULT NULL,
    new_available BOOLEAN DEFAULT NULL
)
    LANGUAGE plpgsql AS $$
DECLARE
    product JSONB;
    product_element JSONB;
BEGIN
    -- Update dish data
    UPDATE Dishes
    SET name = COALESCE(new_name, name),
        description = COALESCE(new_description, description),
        price = COALESCE(new_price, price),
        available = COALESCE(new_available, available),
        editedat = NOW()::DATE
    WHERE id = _id;

    -- Delete specified product_ids from Dishingredients
    DELETE FROM Dishingredients WHERE dishid = _id AND productid = ANY(product_ids_to_delete);

    -- Insert new records into Dishingredients
    FOREACH product IN ARRAY products_to_add LOOP
            FOR product_element IN SELECT * FROM jsonb_array_elements(product) LOOP
                    INSERT INTO dishingredients (dishid, productid, amount)
                    VALUES (_id, (product_element->>'id')::INT, (product_element->>'amount')::NUMERIC);
                END LOOP;
        END LOOP;
END;
$$;