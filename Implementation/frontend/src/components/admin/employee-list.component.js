import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
// import {Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup} from "react-bootstrap";
import EditEmployee from "./employee-edit.component";

const Employee = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <td className='px-6 py-4'>{props.employee.firstName}</td>
        <td className='px-6 py-4'>{props.employee.lastName}</td>
        <td className='px-6 py-4'>{props.employee.age}</td>
        <td className='px-6 py-4'>{props.employee.address}</td>
        <td className='px-6 py-4'>{props.employee.phone}</td>
        <td className='px-6 py-4'>{props.employee.dob.substring(0, 10)}</td>
        <td className='px-6 py-4'>{props.employee.department}</td>
        <td className='px-6 py-4'>
            <div class="flex justify-center">
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { props.gotoUpdateEmployee(props.employee._id) }}>
                        <div class="">
                            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                            </svg>
                        </div>
                        <div class="">
                            Update
                        </div>
                    </button>
                </div>
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => { props.deleteEmployee(props.employee._id) }}>
                        <div class="">
                            <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <div class="">
                            Delete
                        </div>
                        Delete
                    </button>
                </div>
            </div>
        </td>
    </tr>
)

export class EmployeeList extends Component {

    constructor(props) {
        super(props);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.gotoUpdateEmployee = this.gotoUpdateEmployee.bind(this);
        this.state = {
            employee: [],
            searchEmployee: "",
            show: false
        };
    }


    componentDidMount() {
        this.refreshTable();
    }

    refreshTable() {
        axios.get('http://localhost:8080/api/employee/')
            .then(response => {
                this.setState({ employee: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    gotoUpdateEmployee = (id) => {
        this.setState({
            id: id,
            show: true

        })
        console.log("LIst id is :" + id);
    }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshTable();
    }

    deleteEmployee(id) {
        axios.delete('http://localhost:8080/api/employee/' + id)
            .then(res => console.log(res.data));
        this.setState({
            employee: this.state.employee.filter(el => el._id !== id)
        })
    }

    employeeList() {
        return this.state.employee.map(currentemployee => {
            return <Employee employee={currentemployee} deleteEmployee={this.deleteEmployee} gotoUpdateEmployee={this.gotoUpdateEmployee
            } key={currentemployee._id} />;
        })
    }


    searchEmployeeList() {

        return this.state.employee.map((currentemployee) => {
            if (
                this.state.searchEmployee ==
                currentemployee.firstName
            ) {
                return (
                    // <tr>
                    //     <td >{currentemployee.firstName}</td>
                    //     <td style={{ width: "10%" }}>{currentemployee.lastName}</td>
                    //     <td style={{ width: "10%" }}>{currentemployee.age}</td>
                    //     <td style={{ width: "10%" }}>{currentemployee.address}</td>
                    //     <td style={{ width: "10%" }}>{currentemployee.phone}</td>
                    //     <td style={{ width: "10%" }}>{currentemployee.dob}</td>
                    //     <td style={{ width: "10%" }}>{currentemployee.department}</td>
                    //     <td style={{ width: "20%" }}>
                    //         {
                    //             <button onClick={() => { this.gotoUpdateEmployee(currentemployee._id) }}>
                    //                 Edit
                    //             </button>
                    //         }
                    //         {"  "}
                    //         {
                    //             <button
                    //                 onClick={() => {
                    //                     //Delete the selected record
                    //                     axios
                    //                         .delete(
                    //                             "http://localhost:5100/api/employee/" + currentemployee._id
                    //                         )
                    //                         .then(() => {
                    //                             alert("Delete Success");
                    //                             //Get data again after delete
                    //                             axios
                    //                                 .get("http://localhost:5100/api/employee")
                    //                                 .then((res) => {
                    //                                     console.log(res.data);
                    //                                     this.setState({
                    //                                         instructor: res.data,
                    //                                     });
                    //                                 })
                    //                                 .catch((err) => console.log(err));
                    //                         })
                    //                         .catch((err) => {
                    //                             alert(err);
                    //                         });
                    //                 }}
                    //             >
                    //                 Delete
                    //             </button>
                    //         }
                    //     </td>
                    // </tr>

                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td className='px-6 py-4'>{currentemployee.firstName}</td>
                        <td className='px-6 py-4'>{currentemployee.lastName}</td>
                        <td className='px-6 py-4'>{currentemployee.age}</td>
                        <td className='px-6 py-4'>{currentemployee.address}</td>
                        <td className='px-6 py-4'>{currentemployee.phone}</td>
                        <td className='px-6 py-4'>{currentemployee.dob.substring(0, 10)}</td>
                        <td className='px-6 py-4'>{currentemployee.department}</td>
                        <td className='px-6 py-4'>
                            <div class="flex justify-center">
                                <div class="">
                                    {
                                        <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { this.gotoUpdateEmployee(currentemployee._id) }}>
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                </svg>
                                            </div>
                                            <div class="">
                                                Update
                                            </div>
                                        </button>
                                    }
                                </div>
                                {"  "}
                                <div class="">
                                    {
                                        <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200'
                                            onClick={() => {
                                                //Delete the selected record
                                                axios
                                                    .delete(
                                                        "http://localhost:8080/api/employee/" + currentemployee._id
                                                    )
                                                    .then(() => {
                                                        alert("Delete Success");
                                                        //Get data again after delete
                                                        axios
                                                            .get("http://localhost:8080/api/employee")
                                                            .then((res) => {
                                                                console.log(res.data);
                                                                this.setState({
                                                                    instructor: res.data,
                                                                });
                                                            })
                                                            .catch((err) => console.log(err));
                                                    })
                                                    .catch((err) => {
                                                        alert(err);
                                                    });
                                            }}
                                        >
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                            <div class="">
                                                Delete
                                            </div>                                        </button>
                                    }
                                </div>
                            </div>
                        </td>
                    </tr>
                );
            }
        });
    }

    exportEmployee = () => {
        console.log("Exporting PDF")
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        const title = "Employee List Report ";
        const headers = [["First Name", "Last Name", "Age", "Address", "Phone", "Date Of Birth", "Department"]];
        const emp = this.state.employee.map(
            Employee => [
                Employee.firstName,
                Employee.lastName,
                Employee.age,
                Employee.address,
                Employee.phone,
                Employee.dob.substring(0, 10),
                Employee.department,
            ]
        );
        let content = {
            startY: 50,
            head: headers,
            body: emp
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Employee-list.pdf")
    }

    render() {
        return (
          <div className="flex flex-col px-5 pt-2">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="items-center overflow-hidden">
                  <div class="grid grid-cols-1 gap-4 content-start">
                    <table>
                      <tr>
                        <th className="drop-shadow-md">
                          <h3>Employee List Details</h3>
                        </th>
                        <td className="flex justify-end gap-2">
                          <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                            <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                              <Link
                                className="font-semibold text-white no-underline"
                                to={"/creatEmployee"}
                              >
                                <div class="flex">
                                  <div class="">
                                    <svg
                                      class="h-5 w-5 mr-2"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                      />
                                    </svg>
                                  </div>
                                  <div class="">Add Employee</div>
                                </div>
                              </Link>
                            </button>
                            <button
                              class="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                              onClick={() => this.exportEmployee()}
                            >
                              <div class="">
                                <svg
                                  class="h-5 w-5 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                  />
                                </svg>
                              </div>
                              <div class="">Download Report Here</div>
                            </button>
                          </div>
                          <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                            <input
                              className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                              type="text"
                              placeholder="Search by first name"
                              aria-label="Search"
                              onChange={(e) => {
                                this.setState({
                                  searchEmployee: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className="relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-black-500 ">
                      <thead className="p-5 text-xs text-black-700 uppercase border bg-[#FF9F00] ">
                        <tr>
                          <th className="p-2 border-black tbhead ">
                            First Name
                          </th>
                          <th className="p-2 tbhead">Last Name</th>
                          <th className="p-2 tbhead">Age</th>
                          <th className="p-2 tbhead">Address</th>
                          <th className="p-2 tbhead">Phone</th>
                          <th className="p-2 tbhead">Date Of Birth</th>
                          <th className="p-2 tbhead">Department</th>
                          <th className="p-2 text-center tbhead">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.searchEmployee == ""
                          ? this.employeeList()
                          : this.searchEmployeeList()}
                      </tbody>
                    </table>
                  </div>
                  <div class="">
                    <Modal
                      show={this.state.show}
                      onHide={this.closeModalBox}
                      centered
                      size={"xl"}
                    >
                      <Modal.Body
                        className={"custom-modal-body-login p-0 mb-5"}
                      >
                        <EditEmployee
                          classId={this.state.id}
                          key={this.state.id}
                          close={this.closeModalBox}
                        />
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

