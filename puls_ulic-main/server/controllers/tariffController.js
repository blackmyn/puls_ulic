const tariffRep = require('../api/dao/tariffRepositories');

const   getTariffs = async (req, res) => {
    try {
      const result = await tariffRep.getAllTariffs();
      res.status(200).json(result);
    } catch (error) {
      console.error('Ошибка в контроллере (getCities):', error.message);
      res.status(401).json({ message: error.message });
    }
  };

module.exports = {
    getTariffs,
};