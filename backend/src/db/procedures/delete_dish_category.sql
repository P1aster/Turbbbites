-- ======================================================
-- Procedure deletes dish category
-- ======================================================
CREATE OR REPLACE PROCEDURE delete_dish_category(_id INT)
    LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM dishcategory WHERE id = _id;
END;
$$;
