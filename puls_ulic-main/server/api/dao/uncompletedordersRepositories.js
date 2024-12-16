const pool = require('../dbconnector/dbconnector');

const createuncompletedorders = async (users_id, tariffs_id, pickup_location, dropoff_location,
    cost, mileage, payment_method) => {
    const sqlInsertUncompletedorders = `INSERT INTO uncompletedorders(
        users_id, tariffs_id, pickup_location, dropoff_location, cost, mileage, payment_method)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id`;
  try {
    const result = await pool.query(sqlInsertUncompletedorders, [users_id, tariffs_id, pickup_location,
    dropoff_location, cost, mileage, payment_method]);
    return result;
  } catch (error) {
    console.error('Ошибка в репозитории (getAllUncompletedorders):', error);
    throw error;
  }
};

const editUncompletedOrders = async (drivers_id, orderId) => {
  try {

    const sqlEditUncompletedOrders = `UPDATE UncompletedOrders SET driver_id = $1 WHERE id = $2 RETURNING *`;
    const result = await pool.query(sqlEditUncompletedOrders, [drivers_id, orderId]);
    return result.rows[0];
  } catch (error) {
    console.error("Ошибка в репозитории (editUncompletedOrders):", error);
    throw error;
  }
};

const getOneOrder = async (orderId) => {
  try {
    const result = await pool.query('SELECT * FROM uncompletedorders WHERE id = $1', [orderId]);
    return result.rows[0];  
  } catch (error) {
    console.error('Ошибка в репозитории (getOneOrder):', error);
    throw error;
  }
};

const deleteuncompletedorder = async (order_id) => {
  try {
    console.log(order_id);
    const result = await pool.query('DELETE FROM uncompletedorders WHERE id = $1', [order_id]);
    return result;  
  } catch (error) {
    console.error('Ошибка в репозитории (getOneOrder):', error);
    throw error;
  }
};

module.exports = {
    createuncompletedorders,
    editUncompletedOrders,
    getOneOrder,
    deleteuncompletedorder
};
