-- ======================================================
-- Procedure to update special hours data
-- ======================================================
CREATE OR REPLACE PROCEDURE update_special_hours(
    _id INT,
    new_restaurantid INT DEFAULT NULL,
    new_daydate DATE DEFAULT NULL,
    new_isclosed BOOLEAN DEFAULT NULL,
    new_openingtime TIME DEFAULT NULL,
    new_closingtime TIME DEFAULT NULL
)
    LANGUAGE plpgsql AS $$
BEGIN
    UPDATE specialhours
    SET restaurantid = COALESCE(new_restaurantid, restaurantid),
        daydate = COALESCE(new_daydate, daydate),
        isclosed = COALESCE(new_isclosed, isclosed),
        opentime = COALESCE(new_openingtime, opentime),
        closetime = COALESCE(new_closingtime, closetime)
    WHERE id = _id;
END;
$$;