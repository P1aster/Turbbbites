-- ======================================================
-- View to get all active restaurants
-- ======================================================
CREATE OR REPLACE VIEW get_active_restaurants AS
SELECT
    id,
    description,
    address,
    postalCode,
    city,
    contactInformation,
    registrationDate
FROM restaurants
WHERE deletedAt IS NULL;
