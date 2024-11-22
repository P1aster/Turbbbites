-- ======================================================
-- Procedure deletes business hours
-- ======================================================
CREATE OR REPLACE PROCEDURE delete_business_hours(business_hours_id INT)
    LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM businesshours WHERE id = business_hours_id;
END;
$$;
