const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    department: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = Employee = mongoose.model("Employee", employeeSchema);
