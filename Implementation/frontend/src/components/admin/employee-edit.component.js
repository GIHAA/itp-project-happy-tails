import React, { Component } from "react";
import axios from "axios";
import * as Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.classId,
      firstName: "",
      lastName: "",
      age: "",
      address: "",
      phone: "",
      dob: new Date(),
      department: "",
    };

    this.onChangeempfirstName = this.onChangeempfirstName.bind(this);
    this.onChangeemplastName = this.onChangeemplastName.bind(this);
    this.onChangeempage = this.onChangeempage.bind(this);
    this.onChangeempaddress = this.onChangeempaddress.bind(this);
    this.onChangeempphone = this.onChangeempphone.bind(this);
    this.onChangeempdob = this.onChangeempdob.bind(this);
    this.onChangeempdepartment = this.onChangeempdepartment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/employee/" + this.state.id)
      .then((response) => {
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          age: response.data.age,
          address: response.data.address,
          phone: response.data.phone,
          dob: new Date(response.data.dob),
          department: response.data.department,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeempfirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeemplastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeempage(e) {
    this.setState({
      age: e.target.value,
    });
  }

  onChangeempaddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  onChangeempphone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangeempdob(date) {
    this.setState({
      dob: date,
    });
  }

  onChangeempdepartment(e) {
    this.setState({
      department: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const employee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      address: this.state.address,
      phone: this.state.phone,
      dob: this.state.dob,
      department: this.state.department,
    };

    console.log(employee);
    axios
      .put("http://localhost:8080/api/employee/" + this.state.id, employee)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          // this.refreshTable();
          this.props.close();
          Swal.fire({
            icon: "success",
            title: "Successful",
            text: "Employee details has been updated!",
            background: "#fff",
            confirmButtonColor: "#133EFA",
            iconColor: "#60e004",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "There was an error updating!",
            background: "#fff",
            confirmButtonColor: "#133EFA",
            iconColor: "#e00404",
          });
        }
      });
  }

  render() {
    return (
      <div className="flex flex-col px-5 pt-2 ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="items-center overflow-hidden">
              <div className="">
                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                  <div className="formdiv">
                    <form
                      className="px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50"
                      onSubmit={this.onSubmit}
                    >
                      <p className="text-4xl font-semibold text-black uppercase billheading">
                        Update Employee
                      </p>
                      <div class="grid grid-cols-2 gap-4 form-group">
                        <div className="form-group">
                          <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            Employee First Name :{" "}
                          </label>
                          <input
                            type="text"
                            // required
                            className="form-control"
                            value={this.state.firstName}
                            onChange={this.onChangeempfirstName}
                          />
                          <p />
                        </div>
                        <div className="form-group">
                          <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            Employee Last Name :{" "}
                          </label>
                          <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.lastName}
                            onChange={this.onChangeemplastName}
                          />
                          <p />
                        </div>
                      </div>
                      <div class="grid grid-cols-2 gap-4 form-group">
                        <div className="form-group">
                          <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            Age :{" "}
                          </label>
                          <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.age}
                            onChange={this.onChangeempage}
                          />
                          <p />
                        </div>
                        <div className="form-group">
                          <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            Address :{" "}
                          </label>
                          <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.address}
                            onChange={this.onChangeempaddress}
                          />
                          <p />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          for="large-input"
                          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                        >
                          Phone :{" "}
                        </label>
                        <textarea
                          type="text"
                          required
                          className="form-control"
                          value={this.state.phone}
                          onChange={this.onChangeempphone}
                        />
                        <p />
                      </div>

                      <div className="form-group">
                        <label
                          for="large-input"
                          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                        >
                          Date Of Birth :{" "}
                        </label>
                        <div>
                          <DatePicker
                            selected={this.state.dob}
                            onChange={this.onChangeempdob}
                          />
                        </div>
                        <p />
                      </div>

                      <div className="form-group ">
                        <label
                          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                          for="grid-state"
                        >
                          Department :{" "}
                        </label>
                        <select
                          type="text"
                          required
                          className="form-control"
                          value={this.state.department}
                          onChange={this.onChangeempdepartment}
                        >
                          <option>Department 1</option>
                          <option>Department 2</option>
                          <option>Department 3</option>
                          <option>Department 4</option>
                          <option>Department 5</option>
                        </select>
                        <p />
                      </div>

                      <div className="text-center align-middle form-group">
                        <input
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          type="submit"
                          value="Edit Employee"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
