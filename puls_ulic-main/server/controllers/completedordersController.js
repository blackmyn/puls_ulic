const completedordersRepositories = require('../api/dao/completedordersRepositories');

const createcompletedorders = async (req, res) => {
    try {
      if (
        !req.body.users_id ||
        !req.body.driver_id ||
        !req.body.tariffs_id ||
        !req.body.pickup_location ||
        !req.body.dropoff_location ||
        !req.body.cost ||
        !req.body.mileage ||
        !req.body.payment_method
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const users_id = parseInt(req.body.users_id, 10);
      const tariffs_id = parseInt(req.body.tariffs_id, 10);
      const driver_id = parseInt(req.body.driver_id, 10);
  
      if (isNaN(users_id) || isNaN(tariffs_id) || isNaN(driver_id))  {
        return res.status(400).json({ message: "Invalid ID format" });
      }
  
      const result = await completedordersRepositories.createcompletedorders(
        driver_id,
        users_id,
        null,
        tariffs_id,
        req.body.pickup_location,
        req.body.dropoff_location,
        parseFloat(req.body.cost),
        parseFloat(req.body.mileage),
        req.body.comments,
        req.body.payment_method
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Ошибка в контроллере (createuncompletedorders):", error);
      res.status(500).json({ error: "Server error" });
    }
  };

module.exports = {
    createcompletedorders
};
