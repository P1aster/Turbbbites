-- ======================================================
-- Procedure to update special hours data
-- ======================================================
CREATE OR REPLACE PROCEDURE update_special_hours(
    _id INT,
    _restaurantid INT DEFAULT NULL,
    _daydate DATE DEFAULT NULL,
    _isclosed BOOLEAN DEFAULT NULL,
    _openingtime TIME DEFAULT NULL,
    _closingtime TIME DEFAULT NULL
)
    LANGUAGE plpgsql AS $$
BEGIN
    UPDATE specialhours
    SET restaurantid = COALESCE(_restaurantid, restaurantid),
        daydate = COALESCE(_daydate, daydate),
        isclosed = COALESCE(_isclosed, isclosed),
        opentime = COALESCE(_openingtime, opentime),
        closetime = COALESCE(_closingtime, closetime)
    WHERE id = _id;
END;
$$;