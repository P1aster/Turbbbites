-- ======================================================
-- Procedure deletes special hours
-- ======================================================
CREATE OR REPLACE PROCEDURE delete_special_hours(_id INT)
    LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM specialhours WHERE id = _id;
END;
$$;
