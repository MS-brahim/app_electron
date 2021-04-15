const express = require('express');
const router = express.Router();

const userController = require('../controllers/employee.controller')


router.post('/addEmployee', userController.addEmployee);

router.post('/login', userController.loginEmployee);

router.get('/getEmployee', userController.getAllEmployee);

router.get('/getEmployeeByid/:id', userController.employeeById);



module.exports = router;