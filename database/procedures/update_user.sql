-- ======================================================
-- Procedure to update user data
-- ======================================================
CREATE OR REPLACE PROCEDURE update_user(
    _id INT,
    _fullname VARCHAR(50) DEFAULT NULL,
    _email VARCHAR(50) DEFAULT NULL,
    _password VARCHAR(50) DEFAULT NULL,
    _role INT DEFAULT NULL,
    _status VARCHAR(10) DEFAULT NULL
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE Users
    SET fullname = COALESCE(_fullname, fullname),
        email = COALESCE(_email, email),
        password = COALESCE(_password, password),
        role = COALESCE(_role, role),
        status = COALESCE(_status, status)
    WHERE id = _id;
END;
$$;