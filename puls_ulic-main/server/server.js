const express = require('express');
const cors = require('cors');
const cityController = require('../server/controllers/cityController');
const userController = require('../server/controllers/userController');  

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
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
