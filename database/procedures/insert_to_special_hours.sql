-- ======================================================
-- Function for adding a special hours
-- ======================================================
CREATE OR REPLACE PROCEDURE insert_to_business_hours(
    _restaurantid INT,
    _daydate DATE,
    _isclosed BOOLEAN,
    _openingtime TIME DEFAULT NULL,
    _closingtime TIME DEFAULT NULL
)
    LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO specialhours (
        restaurantid, daydate, opentime, closetime, isclosed
    )
    VALUES (_restaurantid, _daydate, _isclosed, _openingtime, _closingtime);
END;
$$;