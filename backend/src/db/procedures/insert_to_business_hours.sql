-- ======================================================
-- Function for adding a business hours
-- ======================================================
CREATE OR REPLACE PROCEDURE insert_to_business_hours(
    new_restaurantid INT,
    new_dayofweek INT,
    new_isclosed BOOLEAN,
    new_openingtime TIME DEFAULT NULL,
    new_closingtime TIME DEFAULT NULL
)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO businesshours (
        restaurantid, dayofweek, opentime, closetime, isclosed
    )
    VALUES (new_restaurantid, new_dayofweek, new_openingtime, new_closingtime, new_isclosed);
END;
$$;