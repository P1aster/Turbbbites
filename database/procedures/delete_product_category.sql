-- ======================================================
-- Procedure deletes dish category
-- ======================================================
CREATE OR REPLACE PROCEDURE delete_product_category(_id INT)
    LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM productcategory WHERE id = _id;
END;
$$;
