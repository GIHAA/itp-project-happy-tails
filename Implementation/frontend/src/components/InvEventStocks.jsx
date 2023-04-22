import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import inv from "../assets/inv.jpg";
import InventorySideBar from "./InventorySideBar";
import filterImg from "../assets/filter.png";

export default function InvEventStocks() {
  const [stockReq, setStockReq] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {}, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
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
            EVENT STOCK REQUESTS
          </h1>

          <div className="flex">
            <div className=" flex p-5">
              <Link
                to="/stockin"
                className=" bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                Requests
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
            <div className="relative mt-6 ml-[1000px] mb-1">
              <img src={filterImg} className="absolute top-2 left-2 w-4 h-4" />
              <select
                className="pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                <option value="FOOD">FOOD</option>
                <option value="MEDICINE">MEDICINE</option>
                <option value="TOYS">TOYS</option>
                <option value="BATHROOM-ESSENTIALS">BATHROOM ESSENTIALS</option>
                <option value="GROOMING-EQUIPMENTS">GROOMING EQUIPMENTS</option>
                <option value="EVENT-ITEMS">EVENT ITEMS</option>
                <option value="OTHER">OTHER</option>
              </select>
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
                </tr>
              </thead>

              <tbody className="bg-white text-center"></tbody>
            </table>
            <div className=" h-96"></div>
          </div>
        </div>
      </div>{" "}
      {/*Right Side container end*/}
    </div> //Main container end
  );
}

function TableDataRow(props) {
  return <></>;
}
