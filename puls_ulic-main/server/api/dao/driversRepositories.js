const pool = require('../dbconnector/dbconnector');

const getRandomFreeDrivers = async () => {
  try {
    const sql = `
    SELECT d.id AS driver_id,
        u.full_name AS driver_name,
        u.phone_number,
        CONCAT(c.brand, ' ', c.model) AS car,
        gc.color,
        AVG(co.rating) AS average_rating
    FROM Drivers d
    JOIN Users u ON d.user_id = u.id
    JOIN GarageCars gc ON d.garage_car_id = gc.id
    JOIN Cars c ON gc.car_id = c.id
    LEFT JOIN UncompletedOrders uo ON d.id = uo.driver_id
    LEFT JOIN CompletedOrders co ON d.id = co.driver_id
    WHERE uo.driver_id IS NULL 
    AND gc.is_ready = TRUE   
    GROUP BY d.id, u.full_name, u.phone_number, c.brand, c.model, gc.color
    ORDER BY RANDOM()          
    LIMIT 1;                   
  `;
    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    console.error('Ошибка в репозитории (getAllFreeDrivers):', error);
    throw error;
  }
};

module.exports = {
    getRandomFreeDrivers,
};
