-- Таблица: Города
CREATE TABLE Cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Таблица: Тарифы
CREATE TABLE Tariffs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cost_per_km DECIMAL(10, 2) NOT NULL
);

-- Таблица: Запчасти
CREATE TABLE Parts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Таблица: Склады
CREATE TABLE Warehouses (
    id SERIAL PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    city_id INT NOT NULL REFERENCES Cities(id)
);

-- Таблица: Склад-Запчасти
CREATE TABLE WarehouseParts (
    id SERIAL PRIMARY KEY,
    warehouse_id INT NOT NULL REFERENCES Warehouses(id),
    part_id INT NOT NULL REFERENCES Parts(id),
    quantity INT NOT NULL
);

-- Таблица: Использование запчастей
CREATE TABLE PartUsage (
    id SERIAL PRIMARY KEY,
    usage_date DATE NOT NULL,
    quantity INT NOT NULL,
    part_id INT NOT NULL REFERENCES Parts(id)
);

-- Таблица: Автомобили
CREATE TABLE Cars (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('Грузовой', 'Легковой')) NOT NULL
);

-- Таблица: Гаражи
CREATE TABLE Garages (
    id SERIAL PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    city_id INT NOT NULL REFERENCES Cities(id)
);

-- Таблица: Автомобили-Гараж
CREATE TABLE GarageCars (
    id SERIAL PRIMARY KEY,
    garage_id INT NOT NULL REFERENCES Garages(id),
    car_id INT NOT NULL REFERENCES Cars(id),
    car_number VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    is_ready BOOLEAN NOT NULL DEFAULT FALSE
);

-- Таблица: Роли
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

-- Таблица: Пользователи
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NULL,
    role_id INT NOT NULL REFERENCES Roles(id)
);

-- Таблица: Водители
CREATE TABLE Drivers (
    id SERIAL PRIMARY KEY,
    wallet VARCHAR(255) NOT NULL,
    garage_car_id INT NULL REFERENCES GarageCars(id),
    user_id INT NOT NULL REFERENCES Users(id)
);

-- Таблица: Использованные автомобили
CREATE TABLE UsedCars (
    id SERIAL PRIMARY KEY,
    issue_date DATE NOT NULL,
    return_date DATE,
    driver_id INT NOT NULL REFERENCES Drivers(id),
    garage_car_id INT NOT NULL REFERENCES GarageCars(id)
);

-- Таблица: Клиенты
CREATE TABLE Clients (
    id SERIAL PRIMARY KEY,
    requisites VARCHAR(255) NULL,
    user_id INT NOT NULL REFERENCES Users(id)
);

-- Таблица: Диспетчеры
CREATE TABLE Dispatchers (
    id SERIAL PRIMARY KEY,
    requisites VARCHAR(255) NOT NULL,
    user_id INT NOT NULL REFERENCES Users(id)
);

-- Таблица: Выполненные заказы
CREATE TABLE CompletedOrders (
    id SERIAL PRIMARY KEY,
    driver_id INT NOT NULL REFERENCES Drivers(id),
    client_id INT NOT NULL REFERENCES Clients(id),
    dispatcher_id INT NULL REFERENCES Dispatchers(id),
	tariffs_id INT NULL REFERENCES Tatiffs(id),
    cost DECIMAL(10, 2) NOT NULL,
    mileage DECIMAL(10, 2) NOT NULL,
    pickup_location VARCHAR(255) NOT NULL,
    dropoff_location VARCHAR(255) NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5) NULL,
    comments TEXT NULL,
    status VARCHAR(50) CHECK (status IN ('Выполнен', 'Не выполнен')) NOT NULL,
    payment_method VARCHAR(50) NOT NULL
);

-- Таблица: Невыполненные заказы
CREATE TABLE UncompletedOrders (
    id SERIAL PRIMARY KEY,
    driver_id INT NOT NULL REFERENCES Drivers(id),
    client_id INT NOT NULL REFERENCES Clients(id),
    dispatcher_id INT NULL REFERENCES Dispatchers(id),
	tariffs_id INT NULL REFERENCES Tatiffs(id),
    pickup_location VARCHAR(255) NOT NULL,
    dropoff_location VARCHAR(255) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
	mileage DECIMAL(10, 2) NOT NULL,
	payment_method VARCHAR(50) NOT NULL
);
