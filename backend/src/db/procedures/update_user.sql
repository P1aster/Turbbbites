-- ======================================================
-- Procedure to update user data
-- ======================================================
CREATE OR REPLACE PROCEDURE update_user(
    user_id INT,
    new_fullname VARCHAR(50) DEFAULT NULL,
    new_email VARCHAR(50) DEFAULT NULL,
    new_password VARCHAR(50) DEFAULT NULL,
    new_role INT DEFAULT NULL,
    new_status VARCHAR(10) DEFAULT NULL
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE Users
    SET fullname = COALESCE(new_fullname, fullname),
        email = COALESCE(new_email, email),
        password = COALESCE(new_password, password),
        role = COALESCE(new_role, role),
        status = COALESCE(new_status, status)
    WHERE id = user_id;
END;
$$;