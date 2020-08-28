DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE employees(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER
);

CREATE TABLE roles(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INTEGER
);

CREATE TABLE department(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(30)
);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
  ('Jane', 'Austen', 1, 1),
  ('Mark', 'Twain', 2, 1),
  ('Lewis', 'Carroll', 3, 1),
  ('Robert', 'Frost', 4, 1),
  ('J.K.', 'Rowling', 4, 1),
  ('Kurt', 'Vonnegut', 2, 1),
  ('George', 'Orwell', 3, 1);

INSERT INTO roles (title, salary, department_id) VALUES 
  ('manager', 120000, 3),
  ('engineer', 80000, 1),
  ('associate', 50000, 2),
  ('intern', 0, 2);

INSERT INTO department (name) values 
  ('aerospace'),
  ('research'),
  ('sales');

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM department;


