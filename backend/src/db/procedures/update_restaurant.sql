-- ======================================================
-- Procedure to update restaurant data
-- ======================================================
CREATE OR REPLACE PROCEDURE update_restaurant(
    _id INT,
    _description TEXT DEFAULT NULL,
    _address VARCHAR(50) DEFAULT NULL,
    _postalcode VARCHAR(10) DEFAULT NULL,
    _city VARCHAR(50) DEFAULT NULL,
    _contactinformation TEXT DEFAULT NULL,
    _deletedat DATE DEFAULT NULL

)
    LANGUAGE plpgsql AS $$
BEGIN
    UPDATE restaurants
    SET description = COALESCE(_description, description),
        address = COALESCE(_address, address),
        postalcode = COALESCE(_postalcode, postalcode),
        city = COALESCE(_city, city),
        contactinformation = COALESCE(_contactinformation, contactinformation),
        deletedat = COALESCE(_deletedat, deletedat)
    WHERE id = _id;
END;
$$;