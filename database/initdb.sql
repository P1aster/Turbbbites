-- Create a custom schema
CREATE SCHEMA IF NOT EXISTS turbbbites;
-- Set the search path to the new schema
SET search_path TO turbbbites;

CREATE TABLE BusinessHours (
                               id          SERIAL PRIMARY KEY,
                               RestaurantId int4 NOT NULL,
                               dayOfWeek    varchar(20) NOT NULL,
                               openTime     time,
                               closeTime    time,
                               isClosed     bool DEFAULT FALSE NOT NULL);
CREATE TABLE DishCategory (
                              id   SERIAL PRIMARY KEY,
                              name varchar(50) NOT NULL);
CREATE TABLE Dishes (
                        id             SERIAL PRIMARY KEY,
                        DishCategoryId int4,
                        name           varchar(50) NOT NULL,
                        description         text,
                        price          numeric(12, 4) NOT NULL CHECK(price >= 0),
                        createdAt      date DEFAULT CURRENT_DATE NOT NULL,
                        editedAt       date DEFAULT CURRENT_DATE NOT NULL,
                        available      bool DEFAULT FALSE NOT NULL);
CREATE TABLE DishIngredients (
                                 ProductId SERIAL PRIMARY KEY,
                                 DishId    int4 NOT NULL,
                                 amount    numeric(18, 6) NOT NULL CHECK(amount > 0));
CREATE TABLE OrderItem (
                           OrderId  SERIAL PRIMARY KEY,
                           DishId   int4 NOT NULL,
                           quantity int4 NOT NULL CHECK(quantity > 0));
CREATE TABLE Orders (
                        id           SERIAL PRIMARY KEY,
                        UserId       int4,
                        RestaurantId int4 NOT NULL,
                        totalPrice   numeric(12, 4) NOT NULL,
                        status       varchar(20) DEFAULT 'idle' NOT NULL,
                        createdAt    timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                        editedAt     timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL);
CREATE TABLE ProductCategory (
                                 id   SERIAL PRIMARY KEY,
                                 name varchar(50) NOT NULL);
CREATE TABLE Products (
                          id                SERIAL PRIMARY KEY,
                          ProductCategoryId int4,
                          name              varchar(50) NOT NULL,
                          description           text,
                          active            bool DEFAULT TRUE NOT NULL);
CREATE TABLE Restaurants (
                             id                SERIAL PRIMARY KEY,
                             description             text,
                             address            varchar(50) NOT NULL,
                             postalCode         varchar(10) NOT NULL,
                             city               varchar(50) NOT NULL,
                             registrationDate   date DEFAULT CURRENT_DATE NOT NULL,
                             contactInformation text,
                             deletedAt          date);
CREATE TABLE RestaurantStock (
                                 id                   SERIAL PRIMARY KEY,
                                 subId                int4,
                                 RestaurantId         int4 NOT NULL,
                                 ProductId            int4 NOT NULL,
                                 OrderId              int4,
                                 amount               numeric(18, 6) NOT NULL CHECK(amount > 0),
                                 modificationDatetime timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                 expirationDate       date,
                                 stockAction          int4 NOT NULL);
CREATE TABLE SpecialHours (
                              id          SERIAL PRIMARY KEY,
                              RestaurantId int4 NOT NULL,
                              dayDate       date NOT NULL,
                              openTime     time,
                              closeTime    time,
                              isClosed     bool DEFAULT FALSE NOT NULL);
CREATE TABLE Users (
                       id           SERIAL PRIMARY KEY,
                       fullName     varchar(50) NOT NULL,
                       email        varchar(50) NOT NULL,
                       password     varchar(50) NOT NULL,
                       role         int4 DEFAULT 0 NOT NULL,
                       status       varchar(10) DEFAULT 'active' NOT NULL,
                       RestaurantId int4);

ALTER TABLE Orders ADD CONSTRAINT FK_Orders_RestaurantId FOREIGN KEY (RestaurantId) REFERENCES Restaurants (id);
ALTER TABLE RestaurantStock ADD CONSTRAINT FK_RestaurantStock_RestaurantId FOREIGN KEY (RestaurantId) REFERENCES Restaurants (id);
ALTER TABLE Dishes ADD CONSTRAINT FK_Dishes_DishCategoryId FOREIGN KEY (DishCategoryId) REFERENCES DishCategory (id);
ALTER TABLE Products ADD CONSTRAINT FK_Products_ProductCategoryId FOREIGN KEY (ProductCategoryId) REFERENCES ProductCategory (id);
ALTER TABLE OrderItem ADD CONSTRAINT FK_OrderItem_OrderId FOREIGN KEY (OrderId) REFERENCES Orders (id);
ALTER TABLE DishIngredients ADD CONSTRAINT FK_DishIngredients_DishId FOREIGN KEY (DishId) REFERENCES Dishes (id);
ALTER TABLE DishIngredients ADD CONSTRAINT FK_DishIngredients_ProductId FOREIGN KEY (ProductId) REFERENCES Products (id);
ALTER TABLE OrderItem ADD CONSTRAINT FK_OrderItem_DishId FOREIGN KEY (DishId) REFERENCES Dishes (id);
ALTER TABLE RestaurantStock ADD CONSTRAINT FK_RestaurantStock_ProductId FOREIGN KEY (ProductId) REFERENCES Products (id);
ALTER TABLE RestaurantStock ADD CONSTRAINT FK_RestaurantStock_OrderId FOREIGN KEY (OrderId) REFERENCES Orders (id);
ALTER TABLE SpecialHours ADD CONSTRAINT FK_SpecialHours_RestaurantId FOREIGN KEY (RestaurantId) REFERENCES Restaurants (id);
ALTER TABLE BusinessHours ADD CONSTRAINT FK_BusinessHours_RestaurantId FOREIGN KEY (RestaurantId) REFERENCES Restaurants (id);


-- Set root user
INSERT INTO Users (fullName, email, password, role, status) VALUES ('root', 'root@root.com', 'root', 0, 'active');