DO $$
    BEGIN
        IF (SELECT COUNT(*) FROM users WHERE fullname = 'root' AND id = 1) = 1 AND
           (SELECT COUNT(*) FROM restaurants) = 0 AND
           (SELECT COUNT(*) FROM specialhours) = 0 AND
           (SELECT COUNT(*) FROM businesshours) = 0 AND
           (SELECT COUNT(*) FROM restaurantstock) = 0 AND
           (SELECT COUNT(*) FROM products) = 0 AND
           (SELECT COUNT(*) FROM orders) = 0 AND
           (SELECT COUNT(*) FROM dishes) = 0 AND
           (SELECT COUNT(*) FROM dishingredients) = 0 AND
           (SELECT COUNT(*) FROM orderitem) = 0 AND
           (SELECT COUNT(*) FROM dishcategory) = 0 AND
           (SELECT COUNT(*) FROM productcategory) = 0 THEN

            -- Seed data for restaurants table
            INSERT INTO restaurants (description, address, postalCode, city, contactInformation, registrationDate, deletedAt)
            VALUES
                ( 'Restaurant A', '123 Main St', '12345', 'CityA', '123-456-7890', '2023-01-01', NULL),
                ( 'Restaurant B', '456 Elm St', '67890', 'CityB', '987-654-3210', '2023-02-01', NULL),
                ( 'Restaurant C', '789 Oak St', '13579', 'CityC', '555-555-5555', '2023-03-01', NULL),
                ( 'Restaurant D', '101 Pine St', '24680', 'CityD', '444-444-4444', '2023-04-01', NULL),
                ( 'Restaurant E', '202 Maple St', '11223', 'CityE', '333-333-3333', '2023-05-01', NULL),
                ( 'Restaurant F', '303 Birch St', '44556', 'CityF', '222-222-2222', '2023-06-01', NULL),
                ( 'Restaurant G', '404 Cedar St', '77889', 'CityG', '111-111-1111', '2023-07-01', NULL),
                ( 'Restaurant H', '505 Walnut St', '99000', 'CityH', '000-000-0000', '2023-08-01', NULL),
                ( 'Restaurant I', '606 Chestnut St', '22334', 'CityI', '999-999-9999', '2023-09-01', '2024-09-01'),
                ( 'Restaurant J', '707 Redwood St', '55667', 'CityJ', '888-888-8888', '2023-10-01', '2024-10-01');

            -- Seed data for SpecialHours table
            INSERT INTO specialhours ( restaurantid, daydate, openTime, closeTime, isclosed)
            VALUES
                (1, '2023-12-25', '10:00', '18:00', false),
                (2, '2023-12-25', '10:00', '18:00', true),
                ( 3, '2023-12-25', '10:00', '18:00', false),
                ( 4, '2023-12-25', '10:00', '18:00', true),
                ( 5, '2023-12-25', '10:00', '18:00', false),
                ( 6, '2023-12-25', '10:00', '18:00', false),
                ( 7, '2023-12-25', '10:00', '18:00', true),
                ( 8, '2023-12-25', '10:00', '18:00', false),
                ( 9, '2023-12-25', '10:00', '18:00', false),
                (10, '2023-12-25', '10:00', '18:00', false);
            -- Seed data for businessHours table
            INSERT INTO businesshours (restaurantid, dayOfWeek, openTime, closeTime, isclosed)
            VALUES
                ( 1, 1, '08:00', '20:00',false),
                ( 2, 2, '08:00', '20:00',false),
                ( 3, 3, '08:00', '20:00',false),
                ( 4, 4, '08:00', '20:00',false),
                ( 5, 5, '08:00', '20:00',false),
                ( 6, 6, '08:00', '16:00',false),
                ( 7, 7, '08:00', '16:00',false);


            -- Seed data for products table
            INSERT INTO products ( name, description, active)
            VALUES
                ( 'Product A', 'Description for Product A', true),
                ( 'Product B', 'Description for Product B', true),
                ( 'Product C', 'Description for Product C', true),
                ( 'Product D', 'Description for Product D', true),
                ( 'Product E', 'Description for Product E', true),
                ( 'Product F', 'Description for Product F', true),
                ( 'Product G', 'Description for Product G', true),
                ( 'Product H', 'Description for Product H', true),
                ( 'Product I', 'Description for Product I', true),
                ( 'Product J', 'Description for Product J', true);


            -- Seed data for users table
            INSERT INTO users (fullname, email, password, role, status)
            VALUES
                ( 'John Doe', 'john.doe@example.com', 'password123', 1, 'active'),
                ( 'Jane Smith', 'jane.smith@example.com', 'password456', 2, 'active'),
                ( 'Alice Johnson', 'alice.johnson@example.com', 'password789', 1, 'active'),
                ( 'Bob Brown', 'bob.brown@example.com', 'password101', 2, 'active'),
                ( 'Charlie Davis', 'charlie.davis@example.com', 'password202', 1, 'active'),
                ( 'Diana Evans', 'diana.evans@example.com', 'password303', 2, 'inactive'),
                ( 'Eve Foster', 'eve.foster@example.com', 'password404', 1, 'active'),
                ( 'Frank Green', 'frank.green@example.com', 'password505', 2, 'inactive'),
                ( 'Grace Harris', 'grace.harris@example.com', 'password606', 1, 'active'),
                ( 'Hank Irving', 'hank.irving@example.com', 'password707', 2, 'inactive');

            -- Seed data for orders table
            INSERT INTO orders (userid, restaurantid, totalprice, status, createdat, editedat)
            VALUES
                ( 1, 1, 50.00, 'idle', '2023-03-01 12:00:00', '2023-03-01 12:00:00'),
                ( 2, 2, 75.00, 'pending', '2023-03-02 13:00:00', '2023-03-02 13:00:00'),
                ( 3, 3, 100.00, 'completed', '2023-03-03 14:00:00', '2023-03-03 14:00:00'),
                ( 4, 4, 125.00, 'pending', '2023-03-04 15:00:00', '2023-03-04 15:00:00'),
                ( 5, 5, 150.00, 'completed', '2023-03-05 16:00:00', '2023-03-05 16:00:00'),
                ( 6, 6, 175.00, 'pending', '2023-03-06 17:00:00', '2023-03-06 17:00:00'),
                (7, 7, 200.00, 'completed', '2023-03-07 18:00:00', '2023-03-07 18:00:00'),
                ( 8, 8, 225.00, 'pending', '2023-03-08 19:00:00', '2023-03-08 19:00:00'),
                (9, 9, 250.00, 'completed', '2023-03-09 20:00:00', '2023-03-09 20:00:00'),
                ( 10, 10, 275.00, 'pending', '2023-03-10 21:00:00', '2023-03-10 21:00:00');


            -- Seed data for restaurantstock table
            INSERT INTO restaurantstock (subid, restaurantid, productid, orderid, amount, modificationdatetime, expirationdate, stockaction)
            VALUES
                (NULL, 1, 1, NULL, 100, '2023-01-01 12:00:00', '2024-01-01', 'added'),
                ( NULL, 2, 2, NULL, 200, '2023-02-01 12:00:00', '2024-02-01', 'added'),
                ( NULL, 3, 3, NULL, 300, '2023-03-01 12:00:00', '2024-03-01', 'added'),
                ( NULL, 4, 4, NULL, 400, '2023-04-01 12:00:00', '2024-04-01', 'added'),
                (NULL, 5, 5, NULL, 500, '2023-05-01 12:00:00', '2024-05-01', 'added'),
                (NULL, 6, 6, NULL, 600, '2023-06-01 12:00:00', '2024-06-01', 'added'),
                (NULL, 7, 7, NULL, 700, '2023-07-01 12:00:00', '2024-07-01', 'added'),
                (NULL, 8, 8, NULL, 800, '2023-08-01 12:00:00', '2024-08-01', 'added'),
                (NULL, 9, 9, NULL, 900, '2023-09-01 12:00:00', '2024-09-01', 'added'),
                ( NULL, 10, 10, NULL, 1000, '2023-10-01 12:00:00', '2024-10-01', 'added'),
                ( 1, 1, 1, 1, 10, '2023-01-02 12:00:00', '2024-01-01', 'taken'),
                ( 2, 2, 2, 2, 20, '2023-02-02 12:00:00', '2024-02-01', 'taken'),
                ( 3, 3, 3, 3, 30, '2023-03-02 12:00:00', '2024-03-01', 'taken'),
                ( 4, 4, 4, 4, 40, '2023-04-02 12:00:00', '2024-04-01', 'taken'),
                ( 5, 5, 5, 5, 50, '2023-05-02 12:00:00', '2024-05-01', 'taken'),
                ( 6, 6, 6, 6, 60, '2023-06-02 12:00:00', '2024-06-01', 'taken'),
                ( 7, 7, 7, 7, 70, '2023-07-02 12:00:00', '2024-07-01', 'taken'),
                ( 8, 8, 8, 8, 80, '2023-08-02 12:00:00', '2024-08-01', 'taken'),
                ( 9, 9, 9, 9, 90, '2023-09-02 12:00:00', '2024-09-01', 'taken'),
                ( 10, 10, 10, 10, 100, '2023-10-02 12:00:00', '2024-10-01', 'taken'),
                ( 9, 10, 9, 10, 150, '2023-10-02 12:00:00', '2024-10-01', 'taken');




            -- Seed data for dishes table
            INSERT INTO dishes (name, description, price)
            VALUES
                ( 'Dish A', 'Delicious Dish A', 10.00),
                ( 'Dish B', 'Tasty Dish B', 15.00),
                ( 'Dish C', 'Yummy Dish C', 20.00),
                ( 'Dish D', 'Savory Dish D', 25.00),
                ( 'Dish E', 'Spicy Dish E', 30.00),
                ( 'Dish F', 'Sweet Dish F', 35.00),
                ( 'Dish G', 'Tangy Dish G', 40.00),
                ( 'Dish H', 'Bitter Dish H', 45.00),
                ( 'Dish I', 'Sour Dish I', 50.00),
                ( 'Dish J', 'Salty Dish J', 55.00);

            -- Seed data for dishIngradients table
            INSERT INTO dishingredients (dishid, productid, amount)
            VALUES
                (1, 1, 0.1),
                (1, 2, 0.2),
                (2, 3, 0.1),
                (2, 4, 0.2),
                (3, 5, 0.04),
                (3, 6, 0.01),
                (4, 7, 0.09),
                (4, 8, 0.24),
                (5, 9, 0.0125),
                (5, 10, 2);

            -- Seed data for orderitem table
            INSERT INTO orderitem (orderid, dishid, quantity)
            VALUES
                (1, 1, 1),
                (1, 2, 2),
                (2, 3, 1),
                (2, 4, 2),
                (3, 5, 1),
                (3, 6, 2),
                (4, 7, 1),
                (4, 8, 2),
                (5, 9, 1),
                (5, 10, 2),
                (6, 1, 1),
                (6, 2, 2),
                (7, 3, 1),
                (7, 4, 2),
                (8, 5, 1),
                (8, 6, 2),
                (9, 7, 1),
                (9, 8, 2),
                (10, 9, 1),
                (10, 10, 2);

            -- Seed data for dishcategories table
            INSERT INTO dishcategory (name)
            VALUES
                ( 'Category A'),
                ( 'Category B'),
                ( 'Category C'),
                ( 'Category D'),
                ( 'Category E'),
                ( 'Category F'),
                ( 'Category G'),
                ( 'Category H'),
                ( 'Category I'),
                ( 'Category J');

            -- Seed data for productcategories table
            INSERT INTO productcategory (name)
            VALUES
                ( 'Category A'),
                ( 'Category B'),
                ( 'Category C'),
                ( 'Category D'),
                ( 'Category E'),
                ( 'Category F'),
                ( 'Category G'),
                ( 'Category H'),
                ( 'Category I'),
                ( 'Category J');
        END IF;
    END $$;


DO $$
    BEGIN
        -- Delete from orderitem table
        DELETE FROM orderitem;

        -- Delete from dishingredients table
        DELETE FROM dishingredients;

        -- Delete from dishes table
        DELETE FROM dishes;

        -- Delete from orders table
        DELETE FROM orders;

        -- Delete from users table
        DELETE FROM users WHERE fullname != 'root' AND id = 1;

        -- Delete from restaurantstock table
        DELETE FROM restaurantstock;

        -- Delete from products table
        DELETE FROM products;

        -- Delete from businesshours table
        DELETE FROM businesshours;

        -- Delete from specialhours table
        DELETE FROM specialhours;

        -- Delete from restaurants table
        DELETE FROM restaurants;

        -- Delete from dishcategory table
        DELETE FROM dishcategory;

        -- Delete from productcategory table
        DELETE FROM productcategory;
    END $$;