-- ======================================================
-- Procedure to update business hours data
-- ======================================================
CREATE OR REPLACE PROCEDURE update_business_hours(
    _id INT,
    _restaurantid INT DEFAULT NULL,
    _dayofweek INT DEFAULT NULL,
    _isclosed BOOLEAN DEFAULT NULL,
    _openingtime TIME DEFAULT NULL,
    _closingtime TIME DEFAULT NULL
)
    LANGUAGE plpgsql AS $$
BEGIN
    UPDATE businesshours
    SET restaurantid = COALESCE(_restaurantid, restaurantid),
        dayofweek = COALESCE(_dayofweek, dayofweek),
        isclosed = COALESCE(_isclosed, isclosed),
        opentime = COALESCE(_openingtime, opentime),
        closetime = COALESCE(_closingtime, closetime)
        WHERE id = _id;
END;
$$;