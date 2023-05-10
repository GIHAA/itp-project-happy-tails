import React from "react";
import SideBar from "./SideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import editImg from "../../assets/edit.png";
import deleteImg from "../../assets/delete.png";
import emailServices from "../../services/api/emails/user";

const Users = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name : "",
    email : "",
    role : "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [id, setId] = useState("");
  const { about, details } = formData;
  const [sortRole, setSortRole] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const refreshPage = () => {
    axios.get("http://localhost:8080/api/users/").then((res) => {
      setData(res.data);
    });
  };

  const onEdit = (id) => {
    const res = axios.put(`http://localhost:8080/api/users/${id}`, formData);
    toast.success("Users updated successfully");
    setShowEditModal(false);
    setTimeout(function () {
      refreshPage();
      setFormData({});
    }, 2000);
  };

  const onDelete = (id) => {
    const res = axios.delete(`http://localhost:8080/api/users/${id}`);
    toast.success("Users deleted successfully");

    setTimeout(function () {
      refreshPage();
    }, 3000);
  };

  const onSubmit = () => {

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(formData.email)) {
    const res = axios
      .post("http://localhost:8080/api/users/", formData)
      .then((res) => {
        toast.success("Users added successfully");
        emailServices.register(formData).then((res) => {
          toast.success("Logins emailed successfully");
        });
      })
      .catch((err) => alert(err));
    } else {
      toast.error("The email format is invalid.");
    }

    setTimeout(function () {
      refreshPage();
    }, 2000);
  };

  const handleSortChange = (e) => {
    setSortRole(e.target.value);
    refreshPage();
  };

  const filteredData = sortRole
    ? data.filter((item) => item.role === sortRole)
    : data;


  return (
    <>
      <div className="flex ">
        <SideBar />

        <div className=" flex-[85%]">
          <div style={{}} className="bg-cover bg-center h-screen w-full fixed">
            <div className=" w-full h-screen shadow-lg rounded-xl">
              <div className="flex flex-col items-center justify-center h-[80px] bg-[#2E4960]"></div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="ml-[150px] mb-[20px] mt-5 items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl"
              >
                ADD
              </button>

              <div className="flex flex-row mb-3">
                <label htmlFor="sort" className="mr-2 font-bold">
                  Sort by role:
                </label>
                <select
                  name="sort"
                  id="sort"
                  className="border border-gray-400 p-2 rounded-md"
                  onChange={handleSortChange}
                >
                  <option value="">All</option>
                  <option value="ADMIN">Admin</option>
                  <option value="EVENT_MANAGER">Event Manager</option>
                  <option value="INVENTORY_MANAGER">Inventory Manager</option>
                  <option value="VEHICLE_MANAGER">Vehicle Manager</option>
                  <option value="ANIMAL_MANAGER">Animal Manager</option>
                  <option value="FINANCIAL_MANAGER">Financial Manager</option>
                  <option value="SUPPLIER_MANAGER">Supplier Manager</option>
                </select>
              </div>

      
              <div className="h-[500px] overflow-y-scroll ">
  <table className="mx-auto w-[980px] h-auto ml-[100px] ">
    <thead className="bg-[#2E4960] text-white sticky top-0">
      <tr>
        <th className="p-3 w-[350px]">Name</th>
        <th className="p-3">Email</th>
        <th className="p-3">Role</th>
        <th className="p-3">Action</th>
      </tr>
    </thead>

    <tbody className="bg-white text-center border-black ">
      {filteredData.map((item) => {
        return (
          <tr className="hover:bg-[#efeeee] border-[2px]">
            <td className="p-3">{item.name}</td>
            <td className="p-3 w-[250px]">{item.email}</td>
            <td className="p-3 w-[150px]">{item.role}</td>
            <td className="p-3">
              <div className="flex ml-12">
                <button
                  onClick={() => {
                    setShowEditModal(true);
                    setId(item._id);
                  }}
                  className="items-center px-5 py-1 mr-5 bg-[#2E4960] w-[100px] text-white font-semibold hover:bg-[#1b3348] rounded-xl"
                >
                  <span className="flex">
                    <img
                      src={editImg}
                      alt=""
                      className="w-4 h-4 mr-2 mt-1"
                    />
                    Edit
                  </span>
                </button>
                <button
                  className="flex px-5 py-1 mr-5 bg-[#d11818] text-white font-semibold hover:bg-[#760d0d] rounded-xl"
                  onClick={() => onDelete(item._id)}
                >
                  <img
                    src={deleteImg}
                    alt=""
                    className="w-4 h-4 mr-2 mt-1"
                  />
                  Delete
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


              <div></div>
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4 ">
              Add New Users
            </h2>
            
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Name</label>
              <input  id="name" name="name" value={about} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


              <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Email</label>
              <input  id="email" name="email" value={details} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
             
              
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Password</label>
              <input  id="password" name="password" value={details} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
 

              <select name="role" onChange={onChange}>
              <option value="ADMIN">Admin</option>
<option value="USER">User</option>
<option value="EVENT_MANAGER">Event Manager</option>
<option value="INVENTORY_MANAGER">Inventory Manager</option>
<option value="VEHICLE_MANAGER">Vehicle Manager</option>
<option value="ANIMAL_MANAGER">Animal Manager</option>
<option value="FINANCIAL_MANAGER">Financial Manager</option>
<option value="SUPPLIER_MANAGER">Supplier Manager</option>

</select>

<div className="flex mt-5">
                <button className="" onClick={() => setShowCreateModal(false)}>
                  Close
                </button>
                <button className="ml-auto" onClick={() => onSubmit()}>
                  Submit
                </button>
</div>
          </div>
        </div>
      )}

{showEditModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4 ">
              Edit Users
            </h2>
            
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Add New Name</label>
              <input  id="name" name="name" value={about} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


              <label className="font-semibold text-sm text-gray-600 pb-1 block">Add New Email</label>
              <input  id="email" name="email" value={details} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

              <select name="role" onChange={onChange}>
              <option value="ADMIN">Admin</option>
<option value="USER">User</option>
<option value="EVENT_MANAGER">Event Manager</option>
<option value="INVENTORY_MANAGER">Inventory Manager</option>
<option value="VEHICLE_MANAGER">Vehicle Manager</option>
<option value="ANIMAL_MANAGER">Animal Manager</option>
<option value="FINANCIAL_MANAGER">Financial Manager</option>
<option value="SUPPLIER_MANAGER">Supplier Manager</option>

</select>
<div className="flex mt-5">
                <button className="" onClick={() => setShowEditModal(false)}>
                  Close
                </button>
                <button className="ml-auto" onClick={() => onEdit(id)}>
                  Submit
                </button>
</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
