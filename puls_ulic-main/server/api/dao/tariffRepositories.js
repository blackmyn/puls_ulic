const pool = require('../dbconnector/dbconnector');

const getAllTariffs = async () => {
  try {
    const result = await pool.query('SELECT * FROM tariffs');
    return result.rows;
  } catch (error) {
    console.error('Ошибка в репозитории (getAllTariffs):', error);
    throw error;
  }
};

module.exports = {
  getAllTariffs,
};
