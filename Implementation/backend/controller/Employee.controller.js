const Employee = require("../model/Employee.model");

// add employee
const addEmployee = async (req, res) => {
  const { firstName, lastName, age, address, phone, dob, department } =
    req.body;

  const employee = new Employee({
    firstName,
    lastName,
    age,
    address,
    phone,
    dob,
    department,
  });

  await employee
    .save()
    .then(() => res.json("Employee added!"))
    .catch((err) => res.status(400).json("Error : " + err));
};

// update employee

const updateEmployee = async (req, res) => {
  Employee.findByIdAndUpdate(req.params.id)
    .then((existingEmployee) => {
      existingEmployee.firstName = req.body.firstName;
      existingEmployee.lastName = req.body.lastName;
      existingEmployee.age = req.body.age;
      existingEmployee.address = req.body.address;
      existingEmployee.phone = req.body.phone;
      existingEmployee.dob = Date.parse(req.body.dob);
      existingEmployee.department = req.body.department;

      existingEmployee
        .save()
        .then((updatedEmployee) => res.json(updatedEmployee))
        .catch((error) => res.status(400).json("Error: qwse" + error));
    })
    .catch((error) => res.status(400).json("Error: 1" + error));
};

// delete employee
const deleteEmployee = async (req, res) => {
  console.log(req.params.id);
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json("Employee deleted"))
    .catch((err) => res.status(400).json("Error : " + err));
};

// get employee by id

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) res.json(employee);
    else {
      res.json("No employee from this ID");
    }
  } catch (error) {
    res.status(500).send("Server Error" + error);
  }
};

// get all employees
const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.find();
    res.json(employee);
  } catch (error) {
    res.status(500).send("Server Error" + error);
  }
};

/*
router.route('/').get((req,res) => {
    Employee.find()
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error : ' +err));
});
*/

//export
module.exports = {
  addEmployee,
  getEmployeeById,
  deleteEmployee,
  getEmployee,
  updateEmployee,
};
