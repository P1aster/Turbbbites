-- ======================================================
-- Function for adding a user
-- ======================================================
CREATE OR REPLACE PROCEDURE insert_to_users(
    _fullname VARCHAR(50),
    _email VARCHAR(50),
    _password VARCHAR(50),
    _role INT,
    _status VARCHAR(10),
    _restaurantid INT DEFAULT NULL
)
    LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO users (
        fullname, email, password, role, status, restaurantid
    )
    VALUES (_fullname, _email, _password, _role, _status, _restaurantid);
END;
$$;