/* =========================================================
   GearGuard Triggers & Workflow Logic
   Database: PostgreSQL
   Purpose : Automation & Business Rules
   ========================================================= */

/* =========================
   1. AUTO-FILL TEAM
   ========================= */

CREATE OR REPLACE FUNCTION autofill_team_from_equipment()
RETURNS TRIGGER AS $$
BEGIN
    SELECT maintenance_team_id
    INTO NEW.team_id
    FROM equipment
    WHERE equipment_id = NEW.equipment_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_autofill_team
BEFORE INSERT ON maintenance_request
FOR EACH ROW
EXECUTE FUNCTION autofill_team_from_equipment();

/* =========================
   2. COMPLETION TIMESTAMP
   ========================= */

CREATE OR REPLACE FUNCTION set_completion_time()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'REPAIRED' THEN
        NEW.completed_at = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_completion
BEFORE UPDATE ON maintenance_request
FOR EACH ROW
EXECUTE FUNCTION set_completion_time();

/* =========================
   3. SCRAP LOGIC
   ========================= */

CREATE OR REPLACE FUNCTION scrap_equipment_logic()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'SCRAP' THEN
        UPDATE equipment
        SET is_scrapped = TRUE
        WHERE equipment_id = NEW.equipment_id;

        INSERT INTO maintenance_log(request_id, log_message)
        VALUES (NEW.request_id, 'Equipment scrapped and marked unusable');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_scrap_equipment
AFTER UPDATE ON maintenance_request
FOR EACH ROW
EXECUTE FUNCTION scrap_equipment_logic();
/* =========================
   4. MAINTENANCE REQUEST TABLE
   ========================= */