const uncompletedordersRepositories = require('../api/dao/uncompletedordersRepositories');

const createuncompletedorders = async (req, res) => {
    try {
      if (
        !req.body.users_id ||
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
  
      if (isNaN(users_id) || isNaN(tariffs_id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
  
      const result = await uncompletedordersRepositories.createuncompletedorders(
        users_id,
        tariffs_id,
        req.body.pickup_location,
        req.body.dropoff_location,
        parseFloat(req.body.cost),
        parseFloat(req.body.mileage),
        req.body.payment_method
      );
  
      const id = result.rows[0].id;
      res.status(200).json({ id });
    } catch (error) {
      console.error("Ошибка в контроллере (createuncompletedorders):", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  const editUncompletedOrders = async (req, res) => {
    try {
      const { drivers_id } = req.body;
      const { orderId } = req.params;
      
      if (!drivers_id || !orderId) {
        return res.status(400).json({ message: "Driver ID and Order ID are required" });
      }

      const result = await uncompletedordersRepositories.editUncompletedOrders(drivers_id, orderId);
      res.status(200).json({ message: "Order updated successfully", result });
    } catch (error) {
      console.error("Ошибка в контроллере (editUncompletedOrders):", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  const getOneOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const result = await uncompletedordersRepositories.getOneOrder(orderId);
      res.json({
        order_id: orderId,
        driver_id: result.driver_id,
        users_id: result.users_id,
        dispatcher_id: result.dispatcher_id,
        tariffs_id: result.tariffs_id, 
        pickup_location: result.pickup_location,
        dropoff_location: result.dropoff_location,
        cost: result.cost,
        mileage: result.mileage,
        payment_method: result.payment_method
      });

    } catch (error) {
      console.error('Ошибка в контроллере (getOneOrder):', error.message);
      res.status(401).json({ message: error.message });
    }
  };
    
  const deleteuncompletedorder = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { order_id } = req.body;
        console.log(order_id);
        const result = await uncompletedordersRepositories.deleteuncompletedorder(order_id);

        res.status(200).json({ message: "Order deleted successfully", result });
    } catch (error) {
      console.error('Ошибка в контроллере (deleteuncompletedorder):', error.message);
      res.status(401).json({ message: error.message });
    }
  }
module.exports = {
    createuncompletedorders,
    editUncompletedOrders,
    getOneOrder,
    deleteuncompletedorder
};
