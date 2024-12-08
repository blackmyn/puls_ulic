INSERT INTO Cities (name) VALUES 
('Москва'), 
('Санкт-Петербург'), 
('Новосибирск');

INSERT INTO ROLES(role_name) VALUES
('Клиент'),
('Водитель'),
('Диспетчер');

INSERT INTO Users (full_name, phone_number, email, login, password, role_id) VALUES
('Алексей Петров', '+79361234567', 'sashadd.tit@mail.com', 'alexey_petrov', 'password123', 1), 
('Иван Иванов', '+79161234567', 'ivanov@example.com', 'ivan_ivanov', '1234', 1),
('Мария Смирнова', '+79261234567', 'smirnova@example.com', 'maria_smirnova', '12345', 2),
('Алексей Петров', '+79361234567', 'petrov@example.com', 'alexey_petrov', '123456', 1),
('Ольга Кузнецова', '+79461234567', 'kuznetsova@example.com', 'olga_kuznetsova', '1234567', 3); 