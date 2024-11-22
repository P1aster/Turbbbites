-- ======================================================
-- Procedure to delete restaurant
-- ======================================================
CREATE OR REPLACE PROCEDURE delete_restaurant(restaurant_id INT)

LANGUAGE plpgsql AS $$
BEGIN
    -- Delete special hours related to the restaurant
    DELETE FROM SpecialHours WHERE restaurantid = restaurant_id;

-- Delete business hours related to the restaurant
    DELETE FROM BusinessHours WHERE restaurantid = restaurant_id;

-- Delete stock related to the restaurant
    DELETE FROM RestaurantStock WHERE restaurantid = restaurant_id;

-- Delete orders related to the restaurant
    DELETE FROM Orders WHERE restaurantid = restaurant_id;

-- Delete the restaurant
    DELETE FROM Restaurants WHERE id = restaurant_id;
END;
$$;