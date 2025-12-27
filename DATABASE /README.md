# GearGuard – Maintenance Management System

GearGuard is a database-driven maintenance management system designed to
track company equipment and manage corrective and preventive maintenance
requests efficiently.

The system connects **Equipment**, **Maintenance Teams**, and **Requests**
through a structured workflow inspired by real-world ERP systems
(Odoo-like architecture).

---

## 📌 Key Features

- Centralized equipment and asset tracking
- Department-wise and employee-wise equipment ownership
- Specialized maintenance teams and technicians
- Corrective and preventive maintenance requests
- Kanban-style workflow (New → In Progress → Repaired → Scrap)
- Preventive maintenance calendar support
- Automatic team assignment based on equipment
- Equipment scrap handling and audit logging
- Optimized queries using indexes and database views

---

## 🗂 Project Structure

GearGuard/
│
├── database/
│ ├── schema.sql # Tables, constraints, indexes, views
│ ├── triggers.sql # Triggers and workflow automation
│ └── README.md # Database setup instructions
│
├── docs/
│ └── ER_Diagram.png # Entity Relationship Diagram 
│
└── README.md # Project overview 


## 🛠 Technology Stack

- **Database:** PostgreSQL
- **Language:** SQL / PL-pgSQL
- **Design:** Normalized relational schema (3NF)
- **Automation:** Database triggers and functions


## 🚀 Getting Started

To set up the database locally:

1. Install **PostgreSQL**
2. Create a database named `gearguard`
3. Follow the setup instructions inside:
    database/README.md

## 📊 Database Highlights

- Business logic enforced at the database level
- Workflow automation using triggers
- Views designed to support Kanban boards and calendar views
- Suitable for academic projects, hackathons, and ERP-style applications

---

## 📘 Documentation

- Database schema and triggers are documented inside the `database/` folder
- ER diagram (optional) can be added in the `docs/` folder


## 👤 Author

Developed as part of a database-centric system design project focusing on real-world maintenance management workflows.
