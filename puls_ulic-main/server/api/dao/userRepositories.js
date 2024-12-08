const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../dbconnector/dbconnector'); 

const getAuthUser = async ({ email, password }) => {
  const sql = `
    SELECT r.role_name
    FROM users u
    JOIN roles r ON u.role_id = r.id
    WHERE u.email = $1 AND u.password = $2
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [email, password], (err, data) => {
      if (err) {
        console.error('Ошибка SQL:', err.message);
        return reject(new Error("Ошибка с базой данных"));
      }
      if (data.rowCount === 0) {
        return reject(new Error("Неправильный логин или пароль"));
      }

      resolve({ role: data.rows[0].role_name }); 
    });
  });
};

const registerUser = async ({ fullName, phone, email, password }) => {
  const sqlCheckUser = `
    SELECT id FROM users WHERE email = $1
  `;
  const sqlInsertUser = `
    INSERT INTO users (email, password, full_name, phone_number, role_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;
  const sqlInsertClient = `
    INSERT INTO clients (requisites, user_id)
    VALUES ($1, $2)
    RETURNING id
  `;

  return new Promise((resolve, reject) => {
    db.query(sqlCheckUser, [email], async (err, result) => {
      if (err) {
        console.error('Ошибка SQL (проверка email):', err.message);
        return reject(new Error("Ошибка с базой данных"));
      }

      if (result.rowCount > 0) {
        return reject(new Error("Пользователь с таким email уже существует"));
      }

      db.query(
        sqlInsertUser,
        [email, password, fullName, phone, '1'],
        (err, result) => {
          if (err) {
            console.error('Ошибка SQL (добавление пользователя):', err.message);
            return reject(new Error("Ошибка при регистрации пользователя"));
          }

          const userId = result.rows[0].id;

          db.query(sqlInsertClient, ['null', userId], (err, clientResult) => {
            if (err) {
              console.error('Ошибка SQL (добавление клиента):', err.message);
              return reject(new Error("Ошибка при добавлении клиента"));
            }
            resolve({ role: "Клиент" });
          });
        }
      );
    });
  });
};


module.exports = { 
  getAuthUser,
  registerUser
};
