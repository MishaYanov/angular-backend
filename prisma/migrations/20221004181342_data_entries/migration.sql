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
('K&N performance air filter - Stelvio', 80, 'Washable, reusable High-Flow Air Filters feature a state-of-the-art design of layered, oiled cotton media engineered to improve airflow and capture contaminants and are designed to provide an increase in horsepower.', 'http://localhost:3000/images/powerwr_k_n.webp', 2, 3),
('K&N performance air filter - Giulia', 100, 'Washable, reusable High-Flow Air Filters feature a state-of-the-art design of layered, oiled cotton media engineered to improve airflow and capture contaminants and are designed to provide an increase in horsepower.', 'http://localhost:3000/images/powerwr_k_n.webp', 3, 3),
('K&N performance air filter - Giulietta', 60, 'Washable, reusable High-Flow Air Filters feature a state-of-the-art design of layered, oiled cotton media engineered to improve airflow and capture contaminants and are designed to provide an increase in horsepower.', 'http://localhost:3000/images/powerwr_k_n.webp', 1, 3),
('Oil Filter - Stelvio', 15, 'Genuine Alfa Romeo Oil filter', 'http://localhost:3000/images/werwewfsdvcbcvg.jpg', 2, 3),
('Oil Filter - Giulia', 15, 'Genuine Alfa Romeo Oil filter', 'http://localhost:3000/images/werwewfsdvcbcvg.jpg', 3, 3),
('Oil Filter - Giulietta', 15, 'Genuine Alfa Romeo Oil filter', 'http://localhost:3000/images/werwewfsdvcbcvg.jpg', 1, 3),
('Brake Pads - Stelvio', 100, 'Genuine Alfa Romeo Brake Pads', 'http://localhost:3000/images/3434rfsdcvxvxcvx.jpg', 2, 1),
('Brake Pads - Giulia', 100, 'Genuine Alfa Romeo Brake Pads', 'http://localhost:3000/images/cckljkl.jpg', 3, 1),
('Brake Pads - Giulietta', 100, 'Genuine Alfa Romeo Brake Pads', 'http://localhost:3000/images/cxbcxbvdfFront.jpg', 1, 1),
('Brake Discs - Stelvio', 100, 'Genuine Alfa Romeo Brake Discs', 'http://localhost:3000/images/werwxscxczxczx.jpg', 2, 1),
('Brake Discs - Giulia', 100, 'Genuine Alfa Romeo Brake Discs', 'http://localhost:3000/images/mnbnvbv.jpg', 3, 1),
('Brake Discs - Giulietta', 100, 'Genuine Alfa Romeo Brake Discs', 'http://localhost:3000/images/3434rfsdcvxvxcvx.jpg', 1, 1),
('Brake Fluid - Stelvio', 15, 'Genuine Alfa Romeo Brake Fluid', 'http://localhost:3000/images/finish-line-mineral-brake-liquid-960ml.jpg', 2, 1),
('Brake Fluid - Giulia', 15, 'Genuine Alfa Romeo Brake Fluid', 'http://localhost:3000/images/finish-line-mineral-brake-liquid-960ml.jpg', 3, 1),
('Brake Fluid - Giulietta', 15, 'Genuine Alfa Romeo Brake Fluid', 'http://localhost:3000/images/finish-line-mineral-brake-liquid-960ml.jpg', 1, 1),
('Brake Calipers - Stelvio', 100, 'Genuine Alfa Romeo Brake Calipers', 'http://localhost:3000/images/asdcxzrytiu.jpg', 2, 1),
('Brake Calipers - Giulia', 100, 'Genuine Alfa Romeo Brake Calipers', 'http://localhost:3000/images/asdcxzrytiu.jpg', 3, 1),
('Brake Calipers - Giulietta', 100, 'Genuine Alfa Romeo Brake Calipers', 'http://localhost:3000/images/lmfdmngldcmmbn.jpg', 1, 1),
('Brake Hoses - Stelvio', 100, 'Genuine Alfa Romeo Brake Hoses', 'http://localhost:3000/images/fvcxzcv1xzcvddwqewrewqdefwe.jpg', 2, 1),
('Brake Hoses - Giulia', 100, 'Genuine Alfa Romeo Brake Hoses', 'http://localhost:3000/images/fvcxzcv1xzcvddwqewrewqdefwe.jpg', 3, 1),
('Brake Hoses - Giulietta', 100, 'Genuine Alfa Romeo Brake Hoses', 'http://localhost:3000/images/fvcxzcv1xzcvddwqewrewqdefwe.jpg', 1, 1),
('Eibach Suspension kit - Stelvio', 3400, 'Full kit from Eibah lowers 4mm', 'http://localhost:3000/images/oijfodshfire09.jpg', 2, 2),
('Eibach Suspension kit - Giulia', 3400, 'Full kit from Eibah lowers 4mm', 'http://localhost:3000/images/oijfodshfire09.jpg', 2, 2),
('Eibach Suspension kit - Giulietta', 3400, 'Full kit from Eibah lowers 4mm', 'http://localhost:3000/images/oijfodshfire09.jpg', 2, 2),
('Eibach Springs - Stelvio', 1000, 'Eibach Springs lowers 4mm', 'http://localhost:3000/images/lewkflsdkflewr43.jpg', 2, 2),
('Eibach Springs - Giulia', 1000, 'Eibach Springs lowers 4mm', 'http://localhost:3000/images/lewkflsdkflewr43.jpg', 2, 2),
('Eibach Springs - Giulietta', 1000, 'Eibach Springs lowers 4mm', 'http://localhost:3000/images/lewkflsdkflewr43.jpg', 2, 2),
('Eibach Anti Roll Bars - Stelvio', 1000, 'Eibach Anti Roll Bars', 'http://localhost:3000/images/qwesadxZ.jpg', 2, 2),
('Eibach Anti Roll Bars - Giulia', 1000, 'Eibach Anti Roll Bars', 'http://localhost:3000/images/qwesadxZ.jpg', 2, 2),
('Eibach Anti Roll Bars - Giulietta', 1000, 'Eibach Anti Roll Bars', 'http://localhost:3000/images/qwesadxZ.jpg', 2, 2);

-- 'http://localhost:3000/images/cckljkl.jpg'