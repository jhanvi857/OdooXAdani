# GearGuard Database (PostgreSQL)

This folder contains the complete PostgreSQL database implementation
for the GearGuard Maintenance Management System.

## Database Engine
- PostgreSQL
- Uses PL/pgSQL for triggers and workflow automation

## Features
- Fully normalized schema (3NF)
- Automated workflow using triggers
- Kanban board support (status-based)
- Preventive maintenance calendar
- Equipment scrap logic
- Audit logging
- Performance indexes for optimization

## Folder Structure
database/
├── schema.sql -- Tables, constraints, indexes, views
├── triggers.sql -- Functions and triggers (workflow logic)
└── README.md

## How to Run

### Step 1: Create Database
### Step 2: Connect to Database
### Step 3: Run Schema
### Step 4: Run Triggers


## Database Design

The project uses PostgreSQL as the primary database.

Key highlights:
- Equipment-centric maintenance tracking
- Automated team assignment
- Kanban-style workflow
- Preventive maintenance calendar
- Smart buttons and reports

Database scripts are available in the `/DATABASE` folder.

