import React, { useState } from "react";
import { Link } from "react-router-dom";
import inv from "../assets/inv.jpg";
import axios from "axios";
import InventorySideBar from "./InventorySideBar";
import { ToastContainer, toast } from "react-toastify";

export default function InvAddItem() {
  const [item_code, setItemCode] = useState("");
  const [item_name, setItemName] = useState("");
  const [item_brand, setItemBrand] = useState("");
  const [category, setItemCategory] = useState("");
  const [qty, setItemQty] = useState("");

  function addItem(e) {
    e.preventDefault();

    const newItem = {
      item_code,
      item_name,
      item_brand,
      category,
      qty,
    };
    console.log(newItem);

    axios
      .post("http://localhost:8080/api/inventory/items", newItem)
      .then(() => {
        toast.error("item added", { position: toast.POSITION.BOTTOM_RIGHT });
      })
      .catch((err) => {
        if (err.response.status === 409)
        toast.error("Cannot insert !! item already exists !!", { position: toast.POSITION.BOTTOM_RIGHT });
        else 
        toast.error(`Item insert unsuccessful ${err}`);
      });
  }

  return (
    //Main container
    <div className="flex scroll-smooth">
      <InventorySideBar />
      {/*Right Side container start*/}
      <div className="bg-[#d9d9d9] flex-[85%]">
        {/*Header Part*/}
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">
            ADD ITEMS
          </h1>

          <div className=" flex p-5">
            <Link
              to="/additem"
              className=" bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
            >
              +ADD
            </Link>
          </div>
        </div>

        {/*Body Part*/}
        <div
          style={{ backgroundImage: `url(${inv})` }}
          className="bg-cover bg-center h-screen w-full fixed"
        >
          <div className=" bg-white bg-opacity-90 w-[85%] h-[90%] absolute overflow-scroll">
            <div className="w-[800px] h-[400px] mx-auto rounded-2xl bg-white mt-12">
              <h1 className=" text-[#ffffff] bg-[#FF9F00] rounded-t-2xl font-bold text-3xl h-20 mb-4 pt-5 text-center drop-shadow-md">
                Enter Item Details
              </h1>

              <div className=" pl-5">
                <form className="mx-auto" onSubmit={addItem}>
                  <div className="flex mb-6">
                    <div>
                      <label className="">Item Code :</label>
                      <input
                        type="text"
                        className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        onChange={(e) => {
                          setItemCode(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label className="">Item Name :</label>
                      <input
                        type="text"
                        className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        onChange={(e) => {
                          setItemName(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex mb-6">
                    <div className=" w-[50%]  ">
                      <label className="">Item Brand :</label>
                      <input
                        type="text"
                        className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        onChange={(e) => {
                          setItemBrand(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className=" w-[50%]  ">
                      <label className="">Item Category :</label>
                      <select
                        className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] "
                        onChange={(e) => {
                          setItemCategory(e.target.value);
                        }}
                      >
                        <option>Select a category</option>
                        <option value="food">FOOD</option>
                        <option value="medicine">MEDICINE</option>
                        <option value="toys">TOYS</option>
                        <option value="bathroom-essentials">
                          BATHROOM ESSENTIALS
                        </option>
                        <option value="grooming-equipments">
                          GROOMING EQUIPMENTS
                        </option>
                        <option value="event-items">EVENT ITEMS</option>
                        <option value="other">OTHER</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex mt-24 h-10">
                    <button className="text-white bg-[#FF9F00] hover:bg-[#2E4960] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-l sm:w-auto px-20 py-5.5 text-center ml-[100px]">
                      <Link to="/items">Cancel</Link>
                    </button>

                    <button
                      type="submit"
                      className="text-white bg-[#FF9F00] hover:bg-[#2E4960] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-l sm:w-auto px-20 py-5.5 text-center ml-[130px]"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/*Right Side container end*/}
    </div> //Main container end
  );
}
