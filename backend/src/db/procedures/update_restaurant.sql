-- ======================================================
-- Procedure to update restaurant data
-- ======================================================
CREATE OR REPLACE PROCEDURE update_restaurant(
    _id INT,
    new_description TEXT DEFAULT NULL,
    new_address VARCHAR(50) DEFAULT NULL,
    new_postal_code VARCHAR(10) DEFAULT NULL,
    new_city VARCHAR(50) DEFAULT NULL,
    new_contactinformation TEXT DEFAULT NULL,
    new_deletedat DATE DEFAULT NULL

)
    LANGUAGE plpgsql AS $$
BEGIN
    UPDATE restaurants
    SET description = COALESCE(new_description, description),
        address = COALESCE(new_address, address),
        postalcode = COALESCE(new_postal_code, postalcode),
        city = COALESCE(new_city, city),
        contactinformation = COALESCE(new_contactinformation, contactinformation),
        deletedat = COALESCE(new_deletedat, deletedat)
    WHERE id = _id;
END;
$$;