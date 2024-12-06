-- ======================================================
-- Function for adding a restaurant
-- ======================================================
CREATE OR REPLACE PROCEDURE insert_to_restaurants(
    _address VARCHAR(50),
    _postalcode VARCHAR(10),
    _city VARCHAR(50),
    _contactinformation text DEFAULT NULL,
    _description TEXT DEFAULT NULL
)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO restaurants (
        description, address, postalcode, city, registrationdate, contactinformation
    )
    VALUES (_description, _address, _postalcode, _city, NOW()::timestamp, _contactinformation);
END;
$$;