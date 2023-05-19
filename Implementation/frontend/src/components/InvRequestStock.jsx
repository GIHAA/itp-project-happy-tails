import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import inv from "../assets/inv.jpg";
import InventorySideBar from "./InventorySideBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function InvRequestStock() {
  const [selected, setSelected] = useState("");
  const [qty, setItemQty] = useState("");
  const [Items, setItems] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/inventory/items/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  function requestStock(e) {
    e.preventDefault();

    if (qty == "") {
      toast.warn("Please enter the required quantity", {
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    const newRequest = {
      item_code: selected.item_code,
      item_name: selected.item_name,
      item_brand: selected.item_brand,
      category: selected.category,
      qty,
    };

    axios
      .post("http://localhost:8080/api/inventory/stockrequest", newRequest, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        toast.success("stock request successful", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((err) => {
        toast.error(`stock request unsuccessful ${err}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  }

  const handleReset = () => {
    setSelected("");
  };

  const handleItemCodeChange = (e) => {
    const itemCode = e.target.value;
    setSelected(Items.find((item) => item.item_code === itemCode));
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
            REQUEST STOCKS
          </h1>

          <div className="flex">
            <div className=" flex p-5">
              <Link
                to="/requeststock"
                className=" bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                REQUEST
              </Link>

              <Link
                to="/requestedstock"
                className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] mr-2"
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
            <div className="w-[800px] h-[500px] mx-auto rounded-2xl bg-white mt-8">
              <h1 className=" text-[#ffffff] bg-[#FF9F00] rounded-t-2xl font-bold text-3xl h-20 mb-4 pt-5 text-center drop-shadow-md">
                Enter Stock Details
              </h1>

              <div className=" pl-5">
                <form
                  className="mx-auto"
                  onSubmit={requestStock}
                  onReset={handleReset}
                >
                  <div className="flex mb-6">
                    <div>
                      <label className="">Item Code :</label>

                      <select
                        name="itemCode"
                        onChange={handleItemCodeChange}
                        className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] mr-8"
                      >
                        <option>SELECT ITEM CODE</option>
                        {Items.map((item) => (
                          <option value={item.item_code}>
                            {item.item_code}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="">Item Name :</label>
                      <input
                        type="text"
                        className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#a6b0c4] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        value={selected.item_name}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="flex mb-6">
                    <div className=" w-[50%]  ">
                      <label className="">Item Brand :</label>
                      <input
                        type="text"
                        className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#a6b0c4] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        value={selected.item_brand}
                        readOnly
                      />
                    </div>

                    <div className=" w-[50%]  ">
                      <label className="">Item Category :</label>
                      <select
                        value={selected.category}
                        className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#a6b0c4] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] "
                        readOnly
                        required
                      >
                        <option value="">Select a category</option>
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

                  <div className="flex mt-6">
                    <div className=" w-[50%]  ">
                      <label className="">Available Quantity :</label>
                      <input
                        className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#a6b0c4] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] "
                        value={selected.qty}
                        readOnly
                      ></input>
                    </div>

                    <div className=" w-[50%] mb-6 ">
                      <label className="">Request Quantity :</label>
                      <input
                        type="number"
                        min={1}
                        className="rounded-3xl py-2.5 px-5 w-[50vh] 
                    text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 
                    appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        onChange={(e) => {
                          setItemQty(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex mt-14">
                    <button
                      type="reset"
                      className="text-white bg-[#FF9F00] hover:bg-[#2E4960] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-l sm:w-auto px-20 py-.5 text-center ml-[130px]"
                    >
                      Cancel{" "}
                    </button>

                    <button
                      type="submit"
                      className="text-white bg-[#FF9F00] hover:bg-[#2E4960] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-l sm:w-auto px-14 py-2 text-center ml-[100px]"
                    >
                      Send Request
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

export default InvRequestStock;
