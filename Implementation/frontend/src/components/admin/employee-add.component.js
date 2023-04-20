import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export class CreateEmployee extends Component {
    constructor(props) {
        super(props);
        this.onChangeempfirstName = this.onChangeempfirstName.bind(this);
        this.onChangeemplastName = this.onChangeemplastName.bind(this);
        this.onChangeempage = this.onChangeempage.bind(this);
        this.onChangeempaddress = this.onChangeempaddress.bind(this);
        this.onChangeempphone = this.onChangeempphone.bind(this);
        this.onChangeempdob = this.onChangeempdob.bind(this);
        this.onChangeempdepartment = this.onChangeempdepartment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // firstName lastName age address phone dob department

        this.state = {
            firstName: '',
            lastName: '',
            age: '',
            address: '',
            phone: '',
            dob: new Date(),
            department: ''
        }
    }

    onChangeempfirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeemplastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeempage(e) {
        this.setState({
            age: e.target.value
        });
    }

    onChangeempaddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeempphone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onChangeempdob(date) {
        this.setState({
            dob: date
        });
    }

    onChangeempdepartment(e) {
        this.setState({
            department: e.target.value
        });
    }

    // demoClicked() {
    //     this.setState({
    //         fullName: "Gihan Perera",
    //         nic: "931524475V",
    //         empID: 32984,
    //         dob: new Date(),
    //         designation: "Labour",
    //         section: "Equipment",
    //         address: "Gampaha",
    //         contactNo: 77564213,
    //         emergency: 76124321,
    //     })
    // }

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
        }

        console.log(employee);

        // if(this.state.empID.length < 0){
        //     this.setState({empIDError : "Employee ID should be longer than 0 characters."})
        // }
        // if(this.state.fullName.length < 6){
        //     this.setState({nameError : "Name should be longer than 6 characters."})
        // }
        // if(this.state.contactNo.length != 10){
        //     this.setState({contactNoError : "Contact Number is invalid."})
        // }

        // else if(this.state.fullName.length >= 10  && this.state.empID.length == 4)
        // {
        axios.post('http://localhost:8080/api/employee/add', employee)
            // .then(res => console.log("success")).catch(err=>console.log(err));

            .then(res => {

                console.log(res);

                if (res.status === 200) {
                    this.clearData();
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Employee has been added!!',
                        background: '#fff',
                        confirmButtonColor: '#133EFA',
                        iconColor: '#60e004'
                    })

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error in adding!',
                        background: '#fff',
                        confirmButtonColor: '#133EFA',
                        iconColor: '#e00404'
                    })
                }
            })
    }

    clearData = () => {
        this.setState({
            firstName: '',
            lastName: '',
            age: '',
            address: '',
            phone: '',
            dob: '',
            department: ''
        })
    }

    render() {
        return (
            <div className="flex flex-col px-5">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                        <div class="">
                                            <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                Add Employee
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>First Name : </label>
                                                    <input type="text"
                                                        required
                                                        placeholder='FName'
                                                        className="form-control "
                                                        value={this.state.firstName}
                                                        onChange={this.onChangeempfirstName}
                                                    /><p />
                                                </div>

                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Last Name : </label>
                                                    <input type="text"
                                                        required
                                                        placeholder='LName'
                                                        className="form-control"
                                                        value={this.state.lastName}
                                                        onChange={this.onChangeemplastName}
                                                    /><p />
                                                </div>

                                            </div>

                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Age : </label>
                                                    <input type="text"
                                                        required
                                                        placeholder='34'
                                                        className="form-control"
                                                        value={this.state.age}
                                                        onChange={this.onChangeempage}
                                                    /><p />
                                                </div>
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Phone : </label>
                                                    <input type="text"
                                                        required
                                                        placeholder='0771556154'
                                                        className="form-control"
                                                        value={this.state.phone}
                                                        onChange={this.onChangeempphone}
                                                    /><p />
                                                </div>

                                            </div>
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Address : </label>
                                                <textarea type="text"
                                                    required
                                                    placeholder='43, Wilson St.Joliet, IL 60435'
                                                    className="form-control"
                                                    value={this.state.address}
                                                    onChange={this.onChangeempaddress}
                                                /><p />
                                            </div>

                                            <div className="form-group">
                                                <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Date Of Birth : </label>
                                                <div>
                                                    <DatePicker
                                                    className='m-2'
                                                        selected={this.state.dob}
                                                        onChange={this.onChangeempdob}
                                                    />
                                                </div>
                                            </div><p/>
                                            {/* <div className="form-group">
                                                <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Department : </label>
                                                <textarea type="text"
                                                    required
                                                    className="form-control"
                                                    value={this.state.department}
                                                    onChange={this.onChangeempdepartment}
                                                /><p />
                                            </div> */}
                                            <div className="form-group ">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' for="grid-state">Department : </label>
                                                <select type="text"
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
                                                </select><p />
                                            </div>

                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add Employee" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}