-- ======================================================
-- Procedure deletes user
-- ======================================================
CREATE OR REPLACE PROCEDURE delete_user(user_id INT)
LANGUAGE plpgsql AS $$
BEGIN
    -- Check if the user is the root user
    IF user_id = 1 THEN
        RAISE EXCEPTION 'Cannot delete the root user';
    END IF;
    DELETE FROM users WHERE id = user_id;
END;
$$;
