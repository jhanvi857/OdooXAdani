/* =========================================================
   GearGuard Database Schema
   Database: PostgreSQL
   Purpose : Tables, Constraints, Indexes, Views
   ========================================================= */

BEGIN;

/* =========================
   1. MASTER TABLES
   ========================= */

CREATE TABLE department (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(150) UNIQUE,
    role VARCHAR(30) CHECK (role IN ('USER','TECHNICIAN','MANAGER')),
    avatar_url TEXT
);

CREATE TABLE maintenance_team (
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE team_member (
    team_id INT REFERENCES maintenance_team(team_id) ON DELETE CASCADE,
    employee_id INT REFERENCES employee(employee_id) ON DELETE CASCADE,
    PRIMARY KEY (team_id, employee_id)
);

/* =========================
   2. EQUIPMENT
   ========================= */

CREATE TABLE equipment (
    equipment_id SERIAL PRIMARY KEY,
    equipment_name VARCHAR(150) NOT NULL,
    serial_number VARCHAR(100) UNIQUE NOT NULL,

    purchase_date DATE,
    warranty_expiry DATE,
    location VARCHAR(150),

    department_id INT REFERENCES department(department_id),
    owned_by_employee INT REFERENCES employee(employee_id),

    maintenance_team_id INT REFERENCES maintenance_team(team_id),
    default_technician INT REFERENCES employee(employee_id),

    is_scrapped BOOLEAN DEFAULT FALSE
);

/* =========================
   3. MAINTENANCE REQUEST
   ========================= */

CREATE TABLE maintenance_request (
    request_id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,

    request_type VARCHAR(20)
        CHECK (request_type IN ('CORRECTIVE','PREVENTIVE')),

    equipment_id INT REFERENCES equipment(equipment_id),
    team_id INT REFERENCES maintenance_team(team_id),

    assigned_to INT REFERENCES employee(employee_id),

    scheduled_date DATE,
    hours_spent NUMERIC(5,2),

    status VARCHAR(20)
        CHECK (status IN ('NEW','IN_PROGRESS','REPAIRED','SCRAP'))
        DEFAULT 'NEW',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

/* =========================
   4. AUDIT LOG
   ========================= */

CREATE TABLE maintenance_log (
    log_id SERIAL PRIMARY KEY,
    request_id INT REFERENCES maintenance_request(request_id) ON DELETE CASCADE,
    log_message TEXT,
    log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =========================
   5. INDEXES
   ========================= */

CREATE INDEX idx_request_status ON maintenance_request(status);
CREATE INDEX idx_request_schedule ON maintenance_request(scheduled_date);
CREATE INDEX idx_equipment_team ON equipment(maintenance_team_id);
CREATE INDEX idx_request_equipment ON maintenance_request(equipment_id);

/* =========================
   6. VIEWS (UI SUPPORT)
   ========================= */

CREATE VIEW kanban_board AS
SELECT
    request_id,
    subject,
    status,
    assigned_to,
    scheduled_date
FROM maintenance_request;

CREATE VIEW preventive_calendar AS
SELECT
    request_id,
    subject,
    scheduled_date,
    assigned_to
FROM maintenance_request
WHERE request_type = 'PREVENTIVE';

CREATE VIEW equipment_open_requests AS
SELECT
    e.equipment_id,
    e.equipment_name,
    COUNT(m.request_id) AS open_requests
FROM equipment e
LEFT JOIN maintenance_request m
ON e.equipment_id = m.equipment_id
AND m.status IN ('NEW','IN_PROGRESS')
GROUP BY e.equipment_id, e.equipment_name;

CREATE VIEW requests_per_team AS
SELECT
    mt.team_name,
    COUNT(mr.request_id) AS total_requests
FROM maintenance_team mt
LEFT JOIN maintenance_request mr
ON mt.team_id = mr.team_id
GROUP BY mt.team_name;

CREATE VIEW overdue_requests AS
SELECT *
FROM maintenance_request
WHERE scheduled_date < CURRENT_DATE
AND status <> 'REPAIRED';

COMMIT;
/* =========================================================
   End of GearGuard Database Schema
   ========================================================= */