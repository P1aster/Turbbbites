-- ======================================================
-- This function returns the details of a dish by its id.
-- ======================================================

CREATE OR REPLACE FUNCTION get_dish_details(dish_id INT)
    RETURNS TABLE (
        id INT,
        name VARCHAR(50),
        description TEXT,
        created_at DATE,
        edited_at DATE
    ) AS $$
BEGIN
    -- Check if dish exists
    IF NOT EXISTS (SELECT 1 FROM dishes WHERE dishes.id = dish_id) THEN
        RAISE EXCEPTION 'Dish with id % does not exist', dish_id;
    END IF;

    RETURN QUERY SELECT
         dish.id,
         dish.name,
         dish.description,
         dish.createdat,
         dish.editedat
    FROM dishes dish
    WHERE dish.id = dish_id;
END;
$$ LANGUAGE plpgsql;

-- ======================================================
-- This function returns the ingredients of a dish by its id.
-- ======================================================

CREATE OR REPLACE FUNCTION get_dish_ingredients(dish_id INT)
    RETURNS TABLE (
          product_id INT,
          name VARCHAR(50),
          description TEXT,
          amount NUMERIC(12, 4)
    ) AS $$
BEGIN
    -- Check if dish exists
    IF NOT EXISTS (SELECT 1 FROM dishes WHERE dishes.id = dish_id) THEN
        RAISE EXCEPTION 'Dish ingredient with id % does not exist', dish_id;
    END IF;


    RETURN QUERY
        SELECT product.id, product.name, product.description, dishingredients.amount
        FROM dishingredients
         JOIN products product ON dishingredients.productid = product.id
        WHERE dishingredients.dishid = dish_id;
END;
$$ LANGUAGE plpgsql;