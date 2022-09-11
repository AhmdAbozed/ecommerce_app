/* Replace with your SQL commands */
CREATE TABLE users (id SERIAL PRIMARY KEY, "username" VARCHAR, "email" VARCHAR, password VARCHAR);
CREATE TABLE types (id SERIAL PRIMARY KEY, name VARCHAR, quantity VARCHAR);
CREATE TABLE brands (id SERIAL PRIMARY KEY, name VARCHAR, quantity VARCHAR);
CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR, type VARCHAR, brand VARCHAR, description VARCHAR, price VARCHAR);
