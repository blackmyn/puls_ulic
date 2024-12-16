const driversRep = require('../api/dao/driversRepositories');

const getAllFreeDrivers = async (req, res) => {
    try {
      const drivers = await driversRep.getRandomFreeDrivers();
      if (drivers.length === 0) {
        return res.status(404).json({ error: 'Свободные водители не найдены' });
      }
  
      const driver = drivers[0];
      res.json({
        name: driver.driver_name,
        phone: driver.phone_number,
        car: driver.car,
        rating: driver.average_rating || 0, 
        photo: "https://media.istockphoto.com/id/978258506/photo/crowdsourced-taxi-driver-in-england.jpg?s=612x612&w=0&k=20&c=iLre7SExG3h26-KZiww1PX_73rqYgjBZc8dCR1Ev7VU=",
        driver_id: driver.driver_id
      });
    } catch (error) {
      console.error('Ошибка в контроллере (getAllFreeDrivers):', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  };

module.exports = {
    getAllFreeDrivers,
};
