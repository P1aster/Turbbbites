-- ======================================================
-- Procedure to update business hours data
-- ======================================================
CREATE OR REPLACE PROCEDURE update_business_hours(
    _id INT,
    new_restaurantid INT DEFAULT NULL,
    new_dayofweek INT DEFAULT NULL,
    new_isclosed BOOLEAN DEFAULT NULL,
    new_openingtime TIME DEFAULT NULL,
    new_closingtime TIME DEFAULT NULL
)
    LANGUAGE plpgsql AS $$
BEGIN
    UPDATE businesshours
    SET restaurantid = COALESCE(new_restaurantid, restaurantid),
        dayofweek = COALESCE(new_dayofweek, dayofweek),
        isclosed = COALESCE(new_isclosed, isclosed),
        opentime = COALESCE(new_openingtime, opentime),
        closetime = COALESCE(new_closingtime, closetime)
        WHERE id = _id;
END;
$$;