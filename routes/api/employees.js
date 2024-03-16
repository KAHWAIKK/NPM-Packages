const express = require('express');
const router = express.Router();
const path = require('path');
const employeesController = require('../../controllers/employeesController')
/* const verifyJWT = require('../../middleware/verifyJWT'); */

/* chaining multiple http methods per route and parameter values */

router.route('/')
    .get( /* verifyJWT , */employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)

router.route('/:id')
    .get(employeesController.getEmployeeById)
    

module.exports = router