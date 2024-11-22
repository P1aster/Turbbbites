-- ======================================================
-- Function for adding a user
-- ======================================================
CREATE OR REPLACE PROCEDURE insert_to_users(
    user_fullname VARCHAR(50),
    user_email VARCHAR(50),
    user_password VARCHAR(50),
    user_role INT,
    user_status VARCHAR(10),
    restaurant_id INT DEFAULT NULL
)
    LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO users (
        fullname, email, password, role, status, restaurantid
    )
    VALUES (user_fullname, user_email, user_password, user_role, user_status, restaurant_id);
END;
$$;