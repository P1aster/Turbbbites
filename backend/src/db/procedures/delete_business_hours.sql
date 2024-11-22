-- ======================================================
-- Procedure deletes business hours
-- ======================================================
CREATE OR REPLACE PROCEDURE delete_business_hours(_id INT)
    LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM businesshours WHERE id = _id;
END;
$$;
