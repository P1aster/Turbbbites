-- ======================================================
-- Procedure deletes special hours
-- ======================================================
CREATE OR REPLACE PROCEDURE delete_special_hours(special_hours_id INT)
    LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM specialhours WHERE id = special_hours_id;
END;
$$;
