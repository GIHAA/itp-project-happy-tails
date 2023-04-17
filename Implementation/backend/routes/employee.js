const express = require("express");
const router = express.Router();

const {
  addEmployee,
  getEmployeeById,
  deleteEmployee,
  getEmployee,
  updateEmployee,
} = require("../controller/Employee.controller");

//@route  POST api/employee
//@desc   add employee
router.post("/add", addEmployee);

//@route  GET api/employee
//@desc   get employee by Id
router.get("/:id", getEmployeeById);

//@route  DELETE api/employee
//@desc   delete employee
router.delete("/:id", deleteEmployee);

//@route  GET api/employee/all
//@desc   get all employees
router.get("/", getEmployee);

//@route  PUT api/employee
//@desc   update employee
router.put("/:id", updateEmployee);

module.exports = router;
