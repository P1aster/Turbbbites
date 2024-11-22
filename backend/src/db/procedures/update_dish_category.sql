-- ======================================================
-- Procedure to update dish category data
-- ======================================================
CREATE OR REPLACE PROCEDURE update_dish_category(
    _id INT,
    new_name VARCHAR(50)
)
    LANGUAGE plpgsql AS $$
BEGIN
    UPDATE dishcategory
    SET name = new_name
    WHERE id = _id;
END;
$$;