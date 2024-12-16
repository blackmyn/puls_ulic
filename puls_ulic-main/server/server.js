const express = require('express');
const cors = require('cors');
const cityController = require('../server/controllers/cityController');
const userController = require('../server/controllers/userController');  
const tariffController = require('../server/controllers/tariffController');  
const uncompletedordersController = require('../server/controllers/uncompletedordersController'); 
const completedordersController = require('../server/controllers/completedordersController'); 
const driversController = require('../server/controllers/driversController');  

class Server {
  constructor() {
    this.app = express(); 
    this.port = 5000; 
    this.initializeMiddlewares(); 
    this.initializeRoutes(); 
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  initializeRoutes() {
    this.app.get('/api/cities', cityController.getCities); 
    this.app.post('/api/login', userController.getUsers); 
    this.app.post('/api/reg', userController.registerUserControll); 
    this.app.get('/api/tariffs', tariffController.getTariffs);
    this.app.post('/api/createuncompletedorders', uncompletedordersController.createuncompletedorders); 
    this.app.get('/api/customer/profile', userController.getUserInfo); 
    this.app.put('/api/customer/editprofile', userController.editUserControll);
    this.app.get('/api/drivers', driversController.getAllFreeDrivers);
    this.app.put('/api/orders/edituncompletedorders/:orderId', uncompletedordersController.editUncompletedOrders);
    this.app.get('/api/foundorder/:orderId', uncompletedordersController.getOneOrder);
    this.app.post('/api/ordercompleted', completedordersController.createcompletedorders);
    this.app.delete('/api/deleteuncompletedorder', uncompletedordersController.deleteuncompletedorder);      
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
