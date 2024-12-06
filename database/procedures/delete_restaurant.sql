-- ======================================================
-- Procedure to delete restaurant
-- ======================================================
CREATE OR REPLACE PROCEDURE hard_delete_restaurant(_id INT)

LANGUAGE plpgsql AS $$
BEGIN
    -- Delete special hours related to the restaurant
    DELETE FROM SpecialHours WHERE restaurantid = _id;

-- Delete business hours related to the restaurant
    DELETE FROM BusinessHours WHERE restaurantid = _id;

-- Delete stock related to the restaurant
    DELETE FROM RestaurantStock WHERE restaurantid = _id;

-- Delete orders related to the restaurant
    DELETE FROM Orders WHERE restaurantid = _id;

-- Delete the restaurant
    DELETE FROM Restaurants WHERE id = _id;
END;
$$;