CREATE DATABASE financial_plan_db;
USE financial_plan_db;

-- Table users
CREATE TABLE users(
id_user VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
name VARCHAR(150) NOT NULL,
email VARCHAR(191) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
update_at DATETIME ON UPDATE CURRENT_TIMESTAMP
);

-- Table Exchange Goals
CREATE TABLE exchange_goals(
id_exchange_goal VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
id_user VARCHAR(36),
destination VARCHAR(100) NOT NULL,
target_currency VARCHAR(3) NOT NULL,
amount_needed DECIMAL(12, 2) NOT NULL,
deadline DATE NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

-- The FK from the table users
CONSTRAINT fk_exchange_goals_users FOREIGN KEY(id_user) REFERENCES users(id_user)
);

-- Table Transactions
CREATE TABLE transactions(
id_transaction VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
id_exchange_goal VARCHAR(36),
description VARCHAR(255) NOT NULL,
amount_brl DECIMAL(12, 2) NOT NULL,
exchange_rate DECIMAL(10, 4) NOT NULL,
amount_foreign DECIMAL(12, 2) NOT NULL,
platform ENUM('WISE','NOMAD','CASH','OTHER'),
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fk_transactions_exchange_goals FOREIGN KEY(id_exchange_goal) REFERENCES exchange_goals(id_exchange_goal)
);

-- Table Checklist Items
create table checklist_items(
id_checklist_item varchar(36) primary key default(uuid()),
id_exchange_goal varchar(36),
title varchar(150) not null,
description text null,
status enum('PENDING', 'IN_PROGRESS', 'COMPLETED'),
due_date date default null,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fk_checklist_items_exchange_goals FOREIGN KEY(id_exchange_goal) REFERENCES exchange_goals(id_exchange_goal)
);
