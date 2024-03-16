const express = require('express');
const router = express.Router();
const path = require('path');
const employeesController = require('../../controllers/employeesController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
/* const verifyJWT = require('../../middleware/verifyJWT'); */

/* chaining multiple http methods per route and parameter values */

router.route('/')
    .get( /* verifyJWT , */employeesController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin ,ROLES_LIST.Editor),employeesController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin ,ROLES_LIST.Editor),employeesController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin ),employeesController.deleteEmployee)

router.route('/:id')
    .get(employeesController.getEmployeeById)
    

module.exports = router