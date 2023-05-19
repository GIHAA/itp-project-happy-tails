import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import inv from "../assets/inv.jpg";
import InventorySideBar from "./InventorySideBar";
import filterImg from "../assets/filter.png";
import { useSelector } from "react-redux";

export default function InvStockIn() {
  const [stockReq, setStockReq] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}api/inventory/stockrequest/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const items = res.data;
        const receivedItems = items.filter(
          (item) => item.status === "received"
        );
        setStockReq(receivedItems);
      })
      .catch((err) => alert(err));
  }, []);

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
            STOCK DETAILS
          </h1>

          <div className="flex">
            <div className=" flex p-5">
              <Link
                to="/stockin"
                className=" bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                STOCK IN
              </Link>

              <Link
                to="/stockout"
                className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                STOCK OUT
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

              <tbody className="bg-white text-center">
                {stockReq
                  .filter((val) => {
                    if (selectedCategory === "") {
                      return val;
                    } else if (
                      selectedCategory.toLowerCase() ===
                      val.category.toLowerCase()
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
                        date={stockrequest.rec_date}
                        status={stockrequest.status}
                      />
                    );
                  })}
              </tbody>
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
          <span className="bg-green-200 text-green-800 inline-block px-2 rounded-xl text-sm ">
            {props.status}
          </span>
        </td>
      </tr>
    </>
  );
}
