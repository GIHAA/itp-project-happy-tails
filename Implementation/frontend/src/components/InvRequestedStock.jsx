import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import inv from "../assets/inv.jpg";
import InventorySideBar from "./InventorySideBar";
import filterImg from "../assets/filter.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const moment = require("moment");

function InvRequestedStock() {
  const [stockReq, setStockReq] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/inventory/stockrequest/")
      .then((res) => {
        setStockReq(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    //Main container
    <div className="flex scroll-smooth">
      <InventorySideBar />
      {/*Right Side container start*/}
      <div className="bg-[#d9d9d9] flex-[85%]">
        {/*Header Part*/}
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">
            ALL REQUESTS
          </h1>

          <div className="flex">
            <div className=" flex p-5">
              <Link
                to="/requeststock"
                className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                REQUEST
              </Link>

              <Link
                to="/requestedstock"
                className=" bg-[#797979]  px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] mr-2"
              >
                REQUESTED STOCKS
              </Link>
            </div>
          </div>
        </div>

        {/*Body Part*/}
        <div
          style={{ backgroundImage: `url(${inv})` }}
          className="bg-cover bg-center h-screen w-full fixed"
        >
          {/*White box*/}
          <div className=" bg-white bg-opacity-90 w-[85%] h-full top-5 left-[80px] overflow-scroll">
            <div className="flex">
              <div className="relative mt-6 ml-[830px] mb-1">
                <img
                  src={filterImg}
                  className="absolute top-2 left-2 w-4 h-4"
                />
                <select
                  className="pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  value={statusFilter}
                  onChange={handleStatusFilter}
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="received">Received</option>
                </select>
              </div>

              <div className="relative mt-6 mb-1 ml-[5px]">
                <img
                  src={filterImg}
                  className="absolute top-2 left-2 w-4 h-4"
                />
                <select
                  className="pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">All Categories</option>
                  <option value="FOOD">FOOD</option>
                  <option value="MEDICINE">MEDICINE</option>
                  <option value="TOYS">TOYS</option>
                  <option value="BATHROOM-ESSENTIALS">
                    BATHROOM ESSENTIALS
                  </option>
                  <option value="GROOMING-EQUIPMENTS">
                    GROOMING EQUIPMENTS
                  </option>
                  <option value="EVENT-ITEMS">EVENT ITEMS</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
            </div>

            {/*Table*/}
            <table className="mx-auto w-[1250px]">
              <thead className=" bg-[#FF9F00] text-white sticky top-0">
                <tr>
                  <th className="p-3">date</th>
                  <th className="p-3">item_code</th>
                  <th className="p-3">item_name</th>
                  <th className="p-3">item_brand</th>
                  <th className="p-3">category</th>
                  <th className="p-3">qty</th>
                  <th className="p-3">status</th>
                  <th className="p-3">action</th>
                </tr>
              </thead>

              <tbody className="bg-white text-center">
                {stockReq.sort((a, b) => {
                  if (a.status.toLowerCase() === 'acepted') {
                    return -1; 
                  } else if (b.status.toLowerCase() === 'accepted') {
                    return 1; 
                  } else {
                    return 0; 
                  }
                }).filter((val) => {
                    if (selectedCategory === "") {
                      return val;
                    } else if (
                      selectedCategory.toLowerCase() ===
                      val.category.toLowerCase()
                    ) {
                      return val;
                    }
                  })
                  .filter((val) => {
                    if (statusFilter === "") {
                      return val;
                    } else if (
                      statusFilter.toLowerCase() === val.status.toLowerCase()
                    ) {
                      return val;
                    }
                  })
                  .map((stockrequest) => {
                    return (
                      <TableDataRow
                        id={stockrequest._id}
                        itemCode={stockrequest.item_code}
                        itemName={stockrequest.item_name}
                        itemBrand={stockrequest.item_brand}
                        category={stockrequest.category}
                        qty={stockrequest.qty}
                        date={stockrequest.date}
                        status={stockrequest.status}
                      />
                    );
                  })}
              </tbody>
            </table>
            <div className=" h-32"></div>
          </div>
        </div>
      </div>{" "}
      {/*Right Side container end*/}
    </div> //Main container end
  );
}

function TableDataRow(props) {
  async function handleClick(id, itemCode, newqty, itemName) {
    const now = moment();
    const formatted = now.format("YYYY-MM-DD, h:mm a"); // Returns a formatted date string like "2023-10-10, 4:28 pm"

    try {
      await axios.put(
        `http://localhost:8080/api/inventory/stockrequest/${id}`,
        {
          status: "RECEIVED",
          rec_date: formatted,
        }
      );
      toast.success(`Sucessfully received ${itemName} ${newqty}`, {position: toast.POSITION.BOTTOM_RIGHT,})
    } catch (err) {
      console.error(err);
    }

    try {
      await axios.put(
        `http://localhost:8080/api/inventory/items/${itemCode}/${newqty}`
      );
      alert("Qty Updated !!");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <tr className="hover:bg-[#efeeee]">
        <td className="p-3">{props.date}</td>
        <td className="p-3">{props.itemCode}</td>
        <td className="p-3">{props.itemName}</td>
        <td className="p-3">{props.itemBrand}</td>
        <td className="p-3">{props.category}</td>
        <td className="p-3">{props.qty}</td>
        <td className="p-3">
          <span
            className={`inline-block px-2 rounded-xl text-sm ${
              props.status === "pending"
                ? "bg-yellow-200 text-yellow-800"
                : props.status === "accepted"
                ? "bg-blue-200 text-blue-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {props.status}
          </span>
        </td>
        <td className="p-3">
          {props.status.toLowerCase() === "accepted" ? (
            <button
              onClick={() => handleClick(props.id, props.itemCode, props.itemName, props.qty)}
              className="px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#ffc05a] rounded-xl "
            >
              ✓ Received
            </button>
          ) : null}
        </td>
      </tr>
    </>
  );
}

export default InvRequestedStock;
