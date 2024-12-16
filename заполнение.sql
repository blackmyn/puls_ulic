INSERT INTO Cities (name) VALUES 
('Москва'), 
('Санкт-Петербург'), 
('Новосибирск');

INSERT INTO Tariffs(name, cost_per_km) VALUES
('Экспресс', 4.0),
('Детский', 5.0),
('Эконом', 2.5),
('Комфорт', 3.8),
('Бизнес', 6.0);

INSERT INTO ROLES(role_name) VALUES
('Клиент'),
('Водитель'),
('Диспетчер');

INSERT INTO Users (full_name, phone_number, email, password, role_id) VALUES
('Алексей Петров', '+79361234567', 'sashadd.tit@mail.com', 'password123', 1), 
('Иван Иванов', '+79161234567', 'ivanov@example.com', '1234', 1),
('Мария Смирнова', '+79261234567', 'smirnova@example.com', '12345', 2),
('Алексей Петров', '+79361234567', 'petrov@example.com', '123456', 1),
('Ольга Кузнецова', '+79461234567', 'kuznetsova@example.com', '1234567', 3),
('Елена Сергеева', '+79561234567', 'sergeeva@example.com', 'securepass1', 2),
('Дмитрий Ковалев', '+79661234567', 'kovalev@example.com', 'securepass2', 2),
('Анна Тихонова', '+79761234567', 'tikhonova@example.com', 'securepass3', 2),
('Максим Морозов', '+79861234567', 'morozov@example.com', 'securepass4', 2),
('Виктория Павлова', '+79961234567', 'pavlova@example.com', 'securepass5', 2),
('Сергей Волков', '+79251234567', 'volkov@example.com', 'securepass6', 2),
('Ольга Соколова', '+79351234567', 'sokolova@example.com', 'securepass7', 2),
('Игорь Воронов', '+79451234567', 'voronov@example.com', 'securepass8', 2),
('Татьяна Лебедева', '+79551234567', 'lebedeva@example.com', 'securepass9', 2),
('Артем Захаров', '+79651234567', 'zaharov@example.com', 'securepass10', 2);

-- Заполнение таблицы Cars (автомобили)
INSERT INTO Cars (brand, model, type) VALUES
('Toyota', 'Camry', 'Легковой'),
('Hyundai', 'Solaris', 'Легковой'),
('Volvo', 'FH16', 'Грузовой'),
('Scania', 'R500', 'Грузовой'),
('Lada', 'Granta', 'Легковой');

-- Заполнение таблицы Garages (гаражи)
INSERT INTO Garages (address, city_id) VALUES
('ул. Ленина, д. 1', 1),
('ул. Декабристов, д. 45', 2),
('ул. Красный проспект, д. 12', 3);

-- Заполнение таблицы GarageCars (автомобили в гараже)
INSERT INTO GarageCars (garage_id, car_id, car_number, color, is_ready) VALUES
(1, 1, 'A123BC77', 'Белый', TRUE),
(2, 2, 'B456DE78', 'Черный', TRUE),
(3, 3, 'C789FG79', 'Красный', TRUE),
(1, 4, 'D101HJ80', 'Синий', TRUE),
(2, 5, 'E202KL81', 'Зеленый', TRUE),
(1, 1, 'A123BC77', 'Белый', TRUE),
(2, 2, 'B456DE78', 'Черный', TRUE),
(3, 3, 'C789FG79', 'Красный', TRUE),
(1, 4, 'D101HJ80', 'Синий', TRUE),
(2, 5, 'E202KL81', 'Зеленый', TRUE);

-- Заполнение таблицы Drivers (водители)
INSERT INTO Drivers (wallet, garage_car_id, user_id) VALUES
('wallet12345', 1, 3),
('wallet67890', 2, 6),
('wallet54321', 3, 7),
('wallet67890', 4, 8),
('wallet54321', 5, 9),
('wallet67890', 6, 10),
('wallet54321', 7, 11),
('wallet67890', 8, 12),
('wallet54321', 9, 13);

-- Заполнение таблицы Dispatchers (диспетчеры)
INSERT INTO Dispatchers (requisites, user_id) VALUES
('ИНН1234567890', 5),
('ИНН0987654321', 4);

-- Заполнение таблицы Warehouses (склады)
INSERT INTO Warehouses (address, city_id) VALUES
('ул. Промышленная, д. 2', 1),
('ул. Заводская, д. 8', 2),
('ул. Северная, д. 16', 3);

-- Заполнение таблицы Parts (запчасти)
INSERT INTO Parts (name) VALUES
('Тормозные колодки'),
('Масляный фильтр'),
('Сцепление'),
('Аккумулятор'),
('Шины');

-- Заполнение таблицы WarehouseParts (запасы на складах)
INSERT INTO WarehouseParts (warehouse_id, part_id, quantity) VALUES
(1, 1, 50),
(2, 2, 30),
(3, 3, 20),
(1, 4, 15),
(2, 5, 40);

-- Заполнение таблицы UncompletedOrders (невыполненные заказы)
INSERT INTO UncompletedOrders (driver_id, users_id, dispatcher_id, tariffs_id, pickup_location, dropoff_location, cost, mileage, payment_method) VALUES
(NULL, 1, 1, 3, 'ул. Ленина, д. 5', 'ул. Гагарина, д. 15', 300.00, 15.5, 'Наличные'),
(NULL, 2, 1, 2, 'ул. Декабристов, д. 10', 'ул. Пушкина, д. 25', 500.00, 20.0, 'Карта'),
(1, 3, 2, 5, 'ул. Крылова, д. 6', 'ул. Тургенева, д. 17', 750.00, 35.0, 'Карта');

-- Заполнение таблицы CompletedOrders (выполненные заказы)
INSERT INTO CompletedOrders (driver_id, users_id, dispatcher_id, tariffs_id, cost, mileage, pickup_location, dropoff_location, rating, comments, status, payment_method) VALUES
(1, 2, 1, 3, 450.00, 18.5, 'ул. Чайковского, д. 7', 'ул. Чехова, д. 12', 5, 'Отличный сервис', 'Выполнен', 'Карта'),
(2, 1, 2, 4, 600.00, 22.0, 'ул. Герцена, д. 9', 'ул. Некрасова, д. 18', 4, 'Хорошо, но машина грязная', 'Выполнен', 'Наличные'),
(3, 3, 2, 2, 500.00, 20.0, 'ул. Суворова, д. 10', 'ул. Жукова, д. 15', 3, 'Долгое ожидание', 'Выполнен', 'Карта');
