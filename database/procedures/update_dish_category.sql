-- ======================================================
-- Procedure to update dish category data
-- ======================================================
CREATE OR REPLACE PROCEDURE update_dish_category(
    _id INT,
    _name VARCHAR(50)
)
    LANGUAGE plpgsql AS $$
BEGIN
    UPDATE dishcategory
    SET name = _name
    WHERE id = _id;
END;
$$;