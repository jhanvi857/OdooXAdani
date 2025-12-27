# GearGuard - The Ultimate Maintenance Tracker

GearGuard is a full-stack maintenance management system designed to help organizations track equipment, manage maintenance requests, and coordinate technicians efficiently.
It is built as a SaaS-style demo application suitable for college projects, hackathons, and product demos.

The system connects equipment, maintenance teams, and requests into a single workflow with role-based access and intuitive dashboards.

---

# Project Overview

GearGuard solves the problem of unorganized asset maintenance by providing:

- Centralized equipment tracking
- Structured maintenance request workflows
- Role-based dashboards for different users
- Visual task tracking using Kanban and Calendar views
- The application is designed as an MVP but follows real-world ERP concepts similar to systems like Odoo.

---

# User Roles
 
- Client : 
Can create and track maintenance requests related to their equipment.

- Technician : 
Can view assigned maintenance requests, update request status, and manage repairs.

- Manager or Admin :
Has full control over equipment, teams, scheduling, and reporting.

---

# Core Features
- Equipment Management : Create and manage equipment records, Store serial number, location, department, warranty, and ownership details. Mark equipment as scrapped when required. Smart button to view all maintenance requests related to a specific equipment

- Maintenance Requests : 
Create corrective and preventive maintenance requests
Automatic assignment of maintenance team and default technician based on equipment
Request lifecycle tracking with statuses New, In Progress, Repaired, Scrap
Overdue request detection based on dates

- Kanban Board : 
Visual request tracking for technicians
Requests grouped by status
Reusable maintenance request cards

- Calendar View : 
Displays preventive maintenance requests
Allows scheduling maintenance on specific dates

- Team Management : 
Create maintenance teams
Assign technicians to teams
Restrict request handling to assigned team members only

- Reporting :
Track maintenance requests by status, team, or equipment
Basic analytics suitable for demos and evaluation

---

# Business Logic Highlights

- When a maintenance request is created, selecting equipment automatically fills the assigned maintenance team and technician.
- Only technicians belonging to the assigned team can work on a request.
- Moving a request to the Scrap status automatically marks the related equipment as unusable.
- Preventive maintenance requests appear in the calendar view based on their scheduled date.

---

# Conclusion
GearGuard demonstrates how a real-world maintenance management system can be designed using modern full-stack technologies.
It balances practical features with clean architecture and provides a strong foundation for further extension into a production-ready system.
