-- ======================================================
-- Function for adding a business hours
-- ======================================================
CREATE OR REPLACE PROCEDURE insert_to_business_hours(
    _restaurantid INT,
    _dayofweek INT,
    _isclosed BOOLEAN,
    _openingtime TIME DEFAULT NULL,
    _closingtime TIME DEFAULT NULL
)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO businesshours (
        restaurantid, dayofweek, opentime, closetime, isclosed
    )
    VALUES (_restaurantid, _dayofweek, _isclosed, _openingtime, _closingtime);
END;
$$;