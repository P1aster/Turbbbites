-- ======================================================
-- Function for adding a dish category
-- ======================================================
CREATE OR REPLACE PROCEDURE insert_to_dish_category(
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