import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SupplierSideBar from "./SupplierSideBar";
import { ToastContainer, toast } from "react-toastify";
import stockBgt from "../assets/stockBgt.jpg";
import deleteImg from "../assets/delete.png";
import editImg from "../assets/edit.png";
import filterImg from "../assets/filter.png";
import { useSelector } from "react-redux";
const moment = require('moment');


export default function StockBudgetRequests() {
  const [budget, setBudget] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const {user} = useSelector((state)=>state.auth);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/stockBudget/",{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setBudget(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8080/api/stockBudget/${id}`,{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        toast.success("Request deleted", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setBudget(budget.filter((budget) => budget._id !== id));
      })
      .catch((err) => alert(err));
  }

  const handleStockFilter = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div className="flex scroll-smooth">
      <SupplierSideBar />

      {/* Right Side container start */}
      <div className="bg-[#d9d9d9] flex-[85%]">
        {/* Header Part */}
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5">
            STOCK BUDGET REQUESTS
          </h1>
          <div className="flex mt-6">
            <div className="ml-5">
              <Link
                to="/StockBudgetRequestForm"
                className="bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[7px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] text-center mr-2"
              >
                +NEW REQUEST
              </Link>
            </div>

            {/*search */}
            <div className="ml-[800px] mb-5">
              <input
                type="text"
                className=" rounded-3xl py-2.5 px-5 w-[40vh]
               text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300
                appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] mr-2"
                placeholder="Search by supplier name, item name.. "
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        {/* Body Part */}
        <div
          style={{ backgroundImage: `url(${stockBgt})` }}
          className="bg-cover bg-center h-screen w-full fixed"
        >
          {/* White box */}
          <div className=" bg-white bg-opacity-90 w-[85%] h-full top-5 left-[80px] overflow-scroll">
            <div className="flex">
              <div className="relative mt-6 ml-[1060px] ">
                <img
                  src={filterImg}
                  className="absolute top-2 left-2 w-4 h-4"
                />
                <select
                  className="pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  value={selectedFilter}
                  onChange={handleStockFilter}
                >
                  <option value="">All</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            {/* Table */}
            <table className="mx-auto my-10 w-[1100px]">
              <thead className="bg-[#FF9F00] text-white sticky top-0">
                <tr>
                  <th className="p-3">Reqested date</th>
                  <th className="p-3">Supplier Name</th>
                  <th className="p-3">Item name</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white text-center">
                {budget
                  .filter((val) => {
                    if (searchTerm == "") {
                      return val;
                    } else if (
                      val.supplier_name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    } else if (
                      val.item_name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .filter((val) => {
                    if (selectedFilter === "") {
                      return val;
                    } else if (
                      selectedFilter.toLowerCase() ===
                      val.status.toLowerCase()
                    ) {
                      return val;
                    }
                  })
                  .map((budget) => {
                    return (
                      <>
                        <tr>
                        <td className="p-3">{moment(budget.submittedAt).format('YY-MM-DD')}</td>
                          <td className="p-3">{budget.supplier_name}</td>
                          <td className="p-3">{budget.item_name}</td>
                          <td className="p-3">{budget.description}</td>
                          <td className="p-3">{budget.total}</td>
                          <td className="p-3">
                            <span
                              className={`inline-block px-2 rounded-xl text-sm ${
                                budget.status === "Accepted" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"
                              }`}
                            >
                              {budget.status}
                            </span>
                          </td>


                          <td className="p-3">
                            <div className="flex ml-12">
                            {/* <button
                              className={`items-center px-5 py-1 mr-5 ${
                                budget.status === "Accepted" ? "bg-gray-300" : "bg-[#2E4960]"
                              } text-white font-semibold hover:bg-[#2E4960] rounded-xl`}
                              disabled={budget.status === "Accepted"}
                            >
                              <Link to={`/UpdateStockBudgetRequest/${budget._id}`} className="flex">
                                <img src={editImg} alt="editimage" className="w-4 h-4 mr-2 mt-1" />
                                Edit
                              </Link>
                            </button> */}


                              <button
                                className={`flex px-5 py-1 mr-5 ${
                                  budget.status === "Accepted" ? "bg-gray-300" : "bg-[#d11818]"
                                } text-white font-semibold hover:bg-gray-300 rounded-xl`}
                                disabled={budget.status === "Accepted"}
                                onClick={() => handleDelete(budget._id)}
                              >
                                <img src={deleteImg} alt="deleteimage" className="w-4 h-4 mr-2 mt-1" />
                                Delete
                              </button>


                            </div>
                          </td>
                        </tr>
                      </>
                    );
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
