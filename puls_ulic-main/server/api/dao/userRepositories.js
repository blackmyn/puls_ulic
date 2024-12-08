const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../dbconnector/dbconnector'); 

const getAuthUser = async ({ email, password }) => {
  const sql = "SELECT * FROM users WHERE email = $1 AND password = $2";

  return new Promise((resolve, reject) => {
    db.query(sql, [email, password], async (err, data) => {
      if (err) {
        console.error('Ошибка SQL:', err.message);
        return reject(new Error("Ошибка с базой данных"));
      }
      if (data.rowCount === 0) {
        return reject(new Error("Неправильный логин или пароль"));
      }
      const user = data.rows[0];
      resolve(user);
    });
  });
};

module.exports = { getAuthUser };
