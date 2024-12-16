const userRep = require('../api/dao/userRepositories');

const getUserInfo = async (req, res) => {
  try {
    const userId = req.query.userId;
    const result = await userRep.getUserInfo(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Ошибка в контроллере (getUserInfo):', error.message);
    res.status(401).json({ message: error.message });
  }
};

const editUserControll = async (req, res) => {
  try {
    if (!req.body.fullName || !req.body.phone || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Data are required" });
    }

    const result = await userRep.editUser(req.body, req.query.userId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Ошибка в контроллере (registerUserControll):', error.message);
    res.status(401).json({ message: error.message }); 
  }
};

const getUsers = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const result = await userRep.getAuthUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('Ошибка в контроллере (getUsers):', error.message);
    res.status(401).json({ message: error.message });
  }
};

const registerUserControll = async (req, res) => {
  try {
    if (!req.body.fullName || !req.body.phone || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Data are required" });
    }

    const result = await userRep.registerUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('Ошибка в контроллере (registerUserControll):', error.message);
    res.status(401).json({ message: error.message }); 
  }
};
  

module.exports = { 
  getUsers,
  registerUserControll,
  getUserInfo,
  editUserControll
};
