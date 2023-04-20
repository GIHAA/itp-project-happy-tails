import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SupplierSideBar from "./SupplierSideBar";
import { ToastContainer, toast } from 'react-toastify';
import supp from "../assets/supp.jpg"
import deleteImg from "../assets/delete.png";
import editImg from "../assets/edit.png";
import PortalHeader from "./common/PortalHeader";

export default function ManageSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm , setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/suppliers/")
      .then((res) => {
        setSuppliers(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8080/api/suppliers/${id}`)
      .then((res) => {
      toast.success("Supplier deleted", {position: toast.POSITION.TOP_RIGHT,})
      setSuppliers(suppliers.filter(suppliers => suppliers._id !== id));
      })
      .catch((err) => alert(err));
  }

  return (
    <div className="flex scroll-smooth">
      
      <SupplierSideBar />

      {/* Right Side container start */}
      <div className="bflex-[85%]">
        {/* Header Part */}
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5">
            MANAGE SUPPLIERS
          </h1>
          <div className="flex mt-6">

          <div className="ml-5">
            <Link
              to='/addSuppliers'
              className="bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] 
              font-bold text-white text-[12px] block w-[100px] text-center mr-2"
            >
              +ADD
            </Link>
          </div>

          {/*search */}
          <div className="ml-[800px] mb-7">
                <input type="text" 
                className=" rounded-3xl py-2.5 px-5 w-[40vh]
                 text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300
                  appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] mr-2"
                placeholder="Search by supplier name,type " 
                onChange={(e) => {setSearchTerm(e.target.value)}}
                /> 
          </div>
          </div>
        </div>

        {/* Body Part */}
        <div 
         style={{ backgroundImage: `url(${supp})` }}
        className="bg-cover bg-center h-screen w-full fixed">
          {/* White box */}
          <div className="bg-white bg-opacity-90 w-[75%] h-[75%] absolute top-5 left-[80px] overflow-scroll">
            {/* Table */}
            <table className="mx-auto my-10 w-[1100px]">
              <thead className="bg-[#FF9F00] text-white sticky top-0">
                <tr>
                  {/* <th className="p-3">SID</th> */}
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone Number</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white text-center">
                {suppliers.filter((val)=>{
                      if(searchTerm == "") {
                        return val;
                      }else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                      }else if(val.type.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                      }
                    }).map((supplier) =>{
                      return(

                        <>
                        <tr>
                          {/* <td className="p-3">{supplier._id}</td> */}
                          <td className="p-3">{supplier.name}</td>
                          <td className="p-3">{supplier.phone}</td>
                          <td className="p-3">{supplier.email}</td>
                          <td className="p-3">{supplier.address}</td>
                          <td className="p-3">{supplier.type}</td>
                        
                          <td className="p-3">
                          <div className="flex ml-12">
                              <button className=" items-center px-5 py-1 w-[110px] mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl">
                                <Link to={`/updateSuppliers/${supplier._id}`}
                                className="flex">
                                <img src={editImg} alt="editimage" className="w-4 h-4 mr-2 mt-1" />
                                  Edit
                                </Link>
                              </button>
                  
                              <button className="flex px-5 py-1 mr-5 bg-[#d11818] text-white font-semibold hover:bg-[#760d0d] rounded-xl "
                              onClick={() => handleDelete(supplier._id)}>
                              <img src={deleteImg} alt="deleteimage" className="w-4 h-4 mr-2 mt-1" />
                                Delete
                              </button>
                            </div>
                          </td>

                        
                        </tr>
                        </>

                      )
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Right Side container end */}
    </div>
  
  );
}

  
