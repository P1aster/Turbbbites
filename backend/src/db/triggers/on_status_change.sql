CREATE OR REPLACE FUNCTION on_status_change()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status <> OLD.status THEN
        NEW.editedat = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_orders_timestamp
    AFTER UPDATE
    ON orders
    FOR EACH ROW
EXECUTE FUNCTION on_status_change();