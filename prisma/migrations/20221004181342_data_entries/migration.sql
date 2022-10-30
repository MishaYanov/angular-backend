-- This is an empty migration.

INSERT INTO users ( name, email, password, "idNumber", city, address, role)
VALUES 
 ( 'admin', 'admin@example.com', '$argon2id$v=19$m=4096,t=3,p=1$hXen2mmCRfd2FZGXJT1lKA$pscPvi1fKLNLuzFtWLSrFo1ASRI0PZiz0nI+RfgpnGQ', '100000000', 'nesher', 'sdds', 'admin'),
 ( 'misha', 'misha@example.com', '$argon2id$v=19$m=4096,t=3,p=1$hXen2mmCRfd2FZGXJT1lKA$pscPvi1fKLNLuzFtWLSrFo1ASRI0PZiz0nI+RfgpnGQ', '100000001', 'nesher', 'sdds', 'user');
 
INSERT INTO car_catergories (name)
VALUES
    ('giulietta'),
    ('stelvio'),
    ('giulia');

INSERT INTO part_categories (name)
VALUES
    ('brakes'),
    ('suspension'),
    ('service');

INSERT INTO products (name, price, description, image, "carCategoryId", "partCategoryId")
VALUES
('K&N performance air filter - Stelvio', 80, 'Washable, reusable High-Flow Air Filters feature a state-of-the-art design of layered, oiled cotton media engineered to improve airflow and capture contaminants and are designed to provide an increase in horsepower.', null, 2, 3),
('K&N performance air filter - Giulia', 100, 'Washable, reusable High-Flow Air Filters feature a state-of-the-art design of layered, oiled cotton media engineered to improve airflow and capture contaminants and are designed to provide an increase in horsepower.', null, 3, 3),
('K&N performance air filter - Giulietta', 60, 'Washable, reusable High-Flow Air Filters feature a state-of-the-art design of layered, oiled cotton media engineered to improve airflow and capture contaminants and are designed to provide an increase in horsepower.', null, 1, 3),
('Oil Filter - Stelvio', 15, 'Genuine Alfa Romeo Oil filter', null, 2, 3),
('Oil Filter - Giulia', 15, 'Genuine Alfa Romeo Oil filter', null, 3, 3),
('Oil Filter - Giulietta', 15, 'Genuine Alfa Romeo Oil filter', null, 1, 3),
('Brake Pads - Stelvio', 100, 'Genuine Alfa Romeo Brake Pads', null, 2, 1),
('Brake Pads - Giulia', 100, 'Genuine Alfa Romeo Brake Pads', null, 3, 1),
('Brake Pads - Giulietta', 100, 'Genuine Alfa Romeo Brake Pads', null, 1, 1),
('Brake Discs - Stelvio', 100, 'Genuine Alfa Romeo Brake Discs', null, 2, 1),
('Brake Discs - Giulia', 100, 'Genuine Alfa Romeo Brake Discs', null, 3, 1),
('Brake Discs - Giulietta', 100, 'Genuine Alfa Romeo Brake Discs', null, 1, 1),
('Brake Fluid - Stelvio', 15, 'Genuine Alfa Romeo Brake Fluid', null, 2, 1),
('Brake Fluid - Giulia', 15, 'Genuine Alfa Romeo Brake Fluid', null, 3, 1),
('Brake Fluid - Giulietta', 15, 'Genuine Alfa Romeo Brake Fluid', null, 1, 1),
('Brake Calipers - Stelvio', 100, 'Genuine Alfa Romeo Brake Calipers', null, 2, 1),
('Brake Calipers - Giulia', 100, 'Genuine Alfa Romeo Brake Calipers', null, 3, 1),
('Brake Calipers - Giulietta', 100, 'Genuine Alfa Romeo Brake Calipers', null, 1, 1),
('Brake Hoses - Stelvio', 100, 'Genuine Alfa Romeo Brake Hoses', null, 2, 1),
('Brake Hoses - Giulia', 100, 'Genuine Alfa Romeo Brake Hoses', null, 3, 1),
('Brake Hoses - Giulietta', 100, 'Genuine Alfa Romeo Brake Hoses', null, 1, 1),
('Eibach Suspension kit - Stelvio', 3400, 'Full kit from Eibah lowers 4mm', null, 2, 2),
('Eibach Suspension kit - Giulia', 3400, 'Full kit from Eibah lowers 4mm', null, 2, 2),
('Eibach Suspension kit - Giulietta', 3400, 'Full kit from Eibah lowers 4mm', null, 2, 2),
('Eibach Springs - Stelvio', 1000, 'Eibach Springs lowers 4mm', null, 2, 2),
('Eibach Springs - Giulia', 1000, 'Eibach Springs lowers 4mm', null, 2, 2),
('Eibach Springs - Giulietta', 1000, 'Eibach Springs lowers 4mm', null, 2, 2),
('Eibach Anti Roll Bars - Stelvio', 1000, 'Eibach Anti Roll Bars', null, 2, 2),
('Eibach Anti Roll Bars - Giulia', 1000, 'Eibach Anti Roll Bars', null, 2, 2),
('Eibach Anti Roll Bars - Giulietta', 1000, 'Eibach Anti Roll Bars', null, 2, 2);

