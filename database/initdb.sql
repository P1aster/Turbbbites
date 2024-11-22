-- Optional: Set search path to public
-- SET search_path TO public;

CREATE TABLE IF NOT EXISTS Users (
                                     id           SERIAL PRIMARY KEY,
                                     fullName     varchar(50) NOT NULL,
                                     email        varchar(50) NOT NULL,
                                     password     varchar(50) NOT NULL,
                                     role         int4 DEFAULT 0 NOT NULL,
                                     status       varchar(10) DEFAULT 'active' NOT NULL,
                                     RestaurantId int4 NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS BusinessHours (
                                             id          SERIAL PRIMARY KEY,
                                             RestaurantId int4 NOT NULL,
                                             dayOfWeek    int4 NOT NULL,
                                             openTime     time NULL DEFAULT NULL,
                                             closeTime    time NULL DEFAULT NULL,
                                             isClosed     bool DEFAULT FALSE NOT NULL
);

CREATE TABLE IF NOT EXISTS DishCategory (
                                            id   SERIAL PRIMARY KEY,
                                            name varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Dishes (
                                      id             SERIAL PRIMARY KEY,
                                      DishCategoryId int4 NULL DEFAULT NULL,
                                      name           varchar(50) NOT NULL,
                                      description         text NULL DEFAULT NULL,
                                      price          numeric(12, 4) NOT NULL CHECK(price >= 0),
                                      createdAt      date DEFAULT CURRENT_DATE NOT NULL,
                                      editedAt       date DEFAULT CURRENT_DATE NOT NULL,
                                      available      bool DEFAULT FALSE NOT NULL
);

CREATE TABLE IF NOT EXISTS DishIngredients (
                                               ProductId  int4 NOT NULL,
                                               DishId    int4 NOT NULL,
                                               amount    numeric(18, 6) NOT NULL CHECK(amount > 0)
);

CREATE TABLE IF NOT EXISTS OrderItem (
                                         OrderId   int4 NOT NULL,
                                         DishId   int4 NOT NULL,
                                         quantity int4 NOT NULL CHECK(quantity > 0)
);

CREATE TABLE IF NOT EXISTS Orders (
                                      id           SERIAL PRIMARY KEY,
                                      UserId       int4 NULL DEFAULT NULL,
                                      RestaurantId int4 NOT NULL,
                                      totalPrice   numeric(12, 4) NOT NULL,
                                      status       varchar(20) DEFAULT 'idle' NOT NULL,
                                      createdAt    timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                      editedAt     timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS ProductCategory (
                                               id   SERIAL PRIMARY KEY,
                                               name varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Products (
                                        id                SERIAL PRIMARY KEY,
                                        ProductCategoryId int4 NULL DEFAULT NULL,
                                        name              varchar(50) NOT NULL,
                                        description           text NULL DEFAULT NULL,
                                        active            bool DEFAULT TRUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Restaurants (
                                           id                SERIAL PRIMARY KEY,
                                           description             text NULL DEFAULT NULL,
                                           address            varchar(50) NOT NULL,
                                           postalCode         varchar(10) NOT NULL,
                                           city               varchar(50) NOT NULL,
                                           registrationDate   date DEFAULT CURRENT_DATE NOT NULL,
                                           contactInformation text NULL DEFAULT NULL,
                                           deletedAt          date NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS RestaurantStock (
                                               id                   SERIAL PRIMARY KEY,
                                               subId                int4 NULL DEFAULT NULL,
                                               RestaurantId         int4 NOT NULL,
                                               ProductId            int4 NOT NULL,
                                               OrderId              int4 NULL DEFAULT NULL,
                                               amount               numeric(18, 6) NOT NULL CHECK(amount > 0),
                                               modificationDatetime timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                               expirationDate       date NULL DEFAULT NULL,
                                               stockAction          varchar(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS SpecialHours (
                                            id          SERIAL PRIMARY KEY,
                                            RestaurantId int4 NOT NULL,
                                            dayDate       date NOT NULL,
                                            openTime     time NULL DEFAULT NULL,
                                            closeTime    time NULL DEFAULT NULL,
                                            isClosed     bool DEFAULT FALSE NOT NULL
);


-- Restricts deletion of a restaurant if it is referenced in the Orders table.
-- This ensures that a restaurant cannot be deleted if there are existing orders associated with it.
ALTER TABLE Orders DROP CONSTRAINT IF EXISTS FK_Orders_RestaurantId;
ALTER TABLE Orders ADD CONSTRAINT FK_Orders_RestaurantId FOREIGN KEY (RestaurantId) REFERENCES Restaurants (id) ON DELETE RESTRICT;

-- Sets the UserId to NULL in Orders table if the referenced user is deleted.
-- This allows the user to be deleted without affecting the orders, but the UserId will be set to NULL.
ALTER TABLE Orders DROP CONSTRAINT IF EXISTS FK_Orders_UserId;
ALTER TABLE Orders ADD CONSTRAINT FK_Orders_UserId FOREIGN KEY (UserId) REFERENCES Users (id) ON DELETE SET NULL;

-- Restricts deletion of a restaurant if it is referenced in the RestaurantStock table.
-- This ensures that a restaurant cannot be deleted if there are existing stock records associated with it.
ALTER TABLE RestaurantStock DROP CONSTRAINT IF EXISTS FK_RestaurantStock_RestaurantId;
ALTER TABLE RestaurantStock ADD CONSTRAINT FK_RestaurantStock_RestaurantId FOREIGN KEY (RestaurantId) REFERENCES Restaurants (id) ON DELETE RESTRICT;

-- Sets the DishCategoryId to NULL in Dishes table if the referenced dish category is deleted.
-- This allows the dish category to be deleted without affecting the dishes, but the DishCategoryId will be set to NULL.
ALTER TABLE Dishes DROP CONSTRAINT IF EXISTS FK_Dishes_DishCategoryId;
ALTER TABLE Dishes ADD CONSTRAINT FK_Dishes_DishCategoryId FOREIGN KEY (DishCategoryId) REFERENCES DishCategory (id) ON DELETE SET NULL;

-- Sets the ProductCategoryId to NULL in Products table if the referenced product category is deleted.
-- This allows the product category to be deleted without affecting the products, but the ProductCategoryId will be set to NULL.
ALTER TABLE Products DROP CONSTRAINT IF EXISTS FK_Products_ProductCategoryId;
ALTER TABLE Products ADD CONSTRAINT FK_Products_ProductCategoryId FOREIGN KEY (ProductCategoryId) REFERENCES ProductCategory (id) ON DELETE SET NULL;

-- Cascades deletion of an order item if the referenced order is deleted.
-- This ensures that all order items associated with a deleted order are also deleted.
ALTER TABLE OrderItem DROP CONSTRAINT IF EXISTS FK_OrderItem_OrderId;
ALTER TABLE OrderItem ADD CONSTRAINT FK_OrderItem_OrderId FOREIGN KEY (OrderId) REFERENCES Orders (id) ON DELETE CASCADE;

-- Restricts deletion of a dish if it is referenced in the OrderItem table.
-- This ensures that a dish cannot be deleted if there are existing order items associated with it.
ALTER TABLE OrderItem DROP CONSTRAINT IF EXISTS FK_OrderItem_DishId;
ALTER TABLE OrderItem ADD CONSTRAINT FK_OrderItem_DishId FOREIGN KEY (DishId) REFERENCES Dishes (id) ON DELETE RESTRICT;

-- Cascades deletion of dish ingredients if the referenced dish is deleted.
-- This ensures that all ingredients associated with a deleted dish are also deleted.
ALTER TABLE DishIngredients DROP CONSTRAINT IF EXISTS FK_DishIngredients_DishId;
ALTER TABLE DishIngredients ADD CONSTRAINT FK_DishIngredients_DishId FOREIGN KEY (DishId) REFERENCES Dishes (id) ON DELETE CASCADE;

-- Restricts deletion of a product if it is referenced in the DishIngredients table.
-- This ensures that a product cannot be deleted if there are existing dish ingredients associated with it.
ALTER TABLE DishIngredients DROP CONSTRAINT IF EXISTS FK_DishIngredients_ProductId;
ALTER TABLE DishIngredients ADD CONSTRAINT FK_DishIngredients_ProductId FOREIGN KEY (ProductId) REFERENCES Products (id) ON DELETE RESTRICT;

-- Restricts deletion of a product if it is referenced in the RestaurantStock table.
-- This ensures that a product cannot be deleted if there are existing stock records associated with it.
ALTER TABLE RestaurantStock DROP CONSTRAINT IF EXISTS FK_RestaurantStock_ProductId;
ALTER TABLE RestaurantStock ADD CONSTRAINT FK_RestaurantStock_ProductId FOREIGN KEY (ProductId) REFERENCES Products (id) ON DELETE RESTRICT;

-- Sets the OrderId to NULL in RestaurantStock table if the referenced order is deleted.
-- This allows the order to be deleted without affecting the stock records, but the OrderId will be set to NULL.
ALTER TABLE RestaurantStock DROP CONSTRAINT IF EXISTS FK_RestaurantStock_OrderId;
ALTER TABLE RestaurantStock ADD CONSTRAINT FK_RestaurantStock_OrderId FOREIGN KEY (OrderId) REFERENCES Orders (id) ON DELETE SET NULL;

-- Cascades deletion of special hours if the referenced restaurant is deleted.
-- This ensures that all special hours associated with a deleted restaurant are also deleted.
ALTER TABLE SpecialHours DROP CONSTRAINT IF EXISTS FK_SpecialHours_RestaurantId;
ALTER TABLE SpecialHours ADD CONSTRAINT FK_SpecialHours_RestaurantId FOREIGN KEY (RestaurantId) REFERENCES Restaurants (id) ON DELETE CASCADE;

-- Cascades deletion of business hours if the referenced restaurant is deleted.
-- This ensures that all business hours associated with a deleted restaurant are also deleted.
ALTER TABLE BusinessHours DROP CONSTRAINT IF EXISTS FK_BusinessHours_RestaurantId;
ALTER TABLE BusinessHours ADD CONSTRAINT FK_BusinessHours_RestaurantId FOREIGN KEY (RestaurantId) REFERENCES Restaurants (id) ON DELETE CASCADE;


-- Set default root user
INSERT INTO Users (fullName, email, password, role, status) VALUES ('root', 'root@root.com', 'root', 0, 'active');