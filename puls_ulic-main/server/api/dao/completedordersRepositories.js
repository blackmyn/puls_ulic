const pool = require('../dbconnector/dbconnector');

const createcompletedorders = async (driver_id, users_id, dispatcher_id, tariffs_id, pickup_location, dropoff_location,
    cost, mileage, comments, payment_method) => {
    const sqlInsertUncompletedorders = `INSERT INTO completedorders(
        driver_id, users_id, dispatcher_id, tariffs_id, cost, mileage, pickup_location, dropoff_location, rating, comments, status, payment_method)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
  try {
    const result = await pool.query(sqlInsertUncompletedorders, [driver_id, users_id, dispatcher_id, tariffs_id, cost, mileage, pickup_location,
    dropoff_location, 5, comments, "Выполнен", payment_method]);
    return result;
  } catch (error) {
    console.error('Ошибка в репозитории (createcompletedorders):', error);
    throw error;
  }
};

module.exports = {
    createcompletedorders
};