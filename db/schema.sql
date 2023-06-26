DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);

SOURCE db/seeds.sql;

-- department list: engineering, finance, legal, sales

-- roles: title, salary, department
-- sales lead, sales, 100000
-- salesperson, sales, 80000
-- lead engineer, engineering, 150000
-- software engineer, engineering, 120000
-- account manager, finance, 160000
-- accountant, finance, 125000
-- legal team lead, legal, 250000
-- lawyer, legal, 190000

-- employees: first, last, title, manager
-- john doe, sales lead, null
-- mike chan, salesperson, john doe
-- ashley rodriguez, lead engineer, null
-- kevin tupik, software engineer, ashley rodriguez
-- kunal singh, account manager, null
-- malia brown, accountant, legal team lead, null
-- sarah lourd, legal team lead, null
-- tom allen, lawyer, sarah lourd
