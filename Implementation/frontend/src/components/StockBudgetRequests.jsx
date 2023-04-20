import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SupplierSideBar from "./SupplierSideBar";
import { ToastContainer, toast } from 'react-toastify';
import stockBgt from "../assets/stockBgt.jpg"
import deleteImg from "../assets/delete.png";
import editImg from "../assets/edit.png";

export default function StockBudgetRequests() {
  const [budget, setBudget] = useState([]);
  const [searchTerm , setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/stockBudget/")
      .then((res) => {
        setBudget(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8080/api/stockBudget/${id}`)
      .then((res) => {
      toast.success("Request deleted", {position: toast.POSITION.TOP_RIGHT,})
      setBudget(budget.filter(budget => budget._id !== id));
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
        STOCK BUDGET REQUESTS
        </h1>
        <div className="flex mt-6">

        <div className="ml-5">
          <Link
            to='/StockBudgetRequestForm'
            className="bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[7px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] text-center mr-2"
          >
            +NEW REQUEST
          </Link>
        </div>

        {/*search */}
        <div className="ml-[800px] mb-5">
              <input type="text" 
              className=" rounded-3xl py-2.5 px-5 w-[40vh]
               text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300
                appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] mr-2"
              placeholder="Search by supplier name, item name.. " 
              onChange={(e) => {setSearchTerm(e.target.value)}}
              /> 
        </div>
        </div>
      </div>

        {/* Body Part */}
        <div 
         style={{ backgroundImage: `url(${stockBgt})` }}
        className="bg-cover bg-center h-screen w-full fixed">
          {/* White box */}
          <div className="bg-white bg-opacity-90 w-[75%] h-[80%] absolute top-5 left-[80px] overflow-scroll">
            {/* Table */}
            <table className="mx-auto my-10 w-[1100px]">
              <thead className="bg-[#FF9F00] text-white sticky top-0">
                <tr>
                  <th className="p-3">Supplier Name</th>
                  <th className="p-3">Item name</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white text-center">
                {budget.filter((val)=>{
                      if(searchTerm == "") {
                        return val;
                      }else if(val.supplier_name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                      }else if(val.item_name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                      }
                    }).map((budget) =>{
                      return(

                        <>
                        <tr>
                          <td className="p-3">{budget.supplier_name}</td>
                          <td className="p-3">{budget.item_name}</td>
                          <td className="p-3">{budget.description}</td>
                          <td className="p-3">{budget.total}</td>
                          <td className="p-3">{budget.status}</td>

                          <td className="p-3">
                          <div className="flex ml-12">
                              <button className=" items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl">
                                <Link to={`/UpdateStockBudgetRequest/${budget._id}`}
                                className="flex">
                                <img src={editImg} alt="editimage" className="w-4 h-4 mr-2 mt-1" />
                                  Edit
                                </Link>
                              </button>
                  
                              <button className="flex px-5 py-1 mr-5 bg-[#d11818] text-white font-semibold hover:bg-[#760d0d] rounded-xl "
                              onClick={() =>  handleDelete(budget._id)}>
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

  
