import React, { useState } from "react";
import axios from "axios";
import SupplierSideBar from "./SupplierSideBar";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import stockBgt from "../assets/stockBgt.jpg";
import { useSelector } from "react-redux";

export default function StockBudgetRequestForm() {
  const [supplier_name, setName] = useState("");
  const [item_name, setItems] = useState("");
  const [description, setDesc] = useState("");
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("Pending");
  const {user} = useSelector((state)=>state.auth);

  function addRequest(e) {
    e.preventDefault();
    const newRequest = {
      supplier_name,
      item_name,
      description,
      total,
      status,
    };
    console.log(newRequest);

    axios
      .post("http://localhost:8080/api/stockBudget/", newRequest,{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        toast.success("request added", { position: toast.POSITION.TOP_RIGHT });

        
        setTimeout(() => {
          window.location.href = "/StockBudgetRequests";
        }, 3000);
       })
      .catch((err) => {
        alert(`Request insert unsuccessful ${err}`);
      });
  }

  return (
    <div className="flex scroll-smooth">
      <SupplierSideBar />
      <div className="bg-[#d9d9d9] flex-[85%]">
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5">
            NEW BUDGET REQUEST
          </h1>
          <div className=" flex p-5"></div>
          <div className=" flex p-5"></div>
        </div>
        <div
          style={{ backgroundImage: `url(${stockBgt})` }}
          className="bg-cover bg-center h-screen w-full fixed"
        >
          <div className=" bg-white bg-opacity-90 w-[75%] h-[80%] absolute top-5 left-[80px] overflow-scroll">
            <div className="w-[800px] mx-auto rounded-2xl bg-white mt-9">
              <h1 className="text-[#ffffff] bg-[#FF9F00] rounded-t-2xl font-bold text-3xl h-20 mb-4 pt-5 text-center drop-shadow-md">
                Enter Budget Details
              </h1>
              <div></div>
              <form className="mx-auto" onSubmit={addRequest}>
                <div className="px-4">
                  <div className>
                    <div>
                      <center>
                        <input
                          placeholder="Enter Supplier Name"
                          type="text"
                          className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          required
                        />{" "}
                      </center>
                    </div>
                  </div>
                  <br></br>

                  <div className>
                    <div>
                      <center>
                        <input
                          placeholder="Enter Item Name"
                          type="text"
                          className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                          onChange={(e) => {
                            setItems(e.target.value);
                          }}
                          required
                        />
                      </center>
                    </div>
                  </div>
                  <br></br>

                  <div className>
                    <div>
                      <center>
                        <input
                          placeholder="Enter description"
                          type="text"
                          className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                          onChange={(e) => {
                            setDesc(e.target.value);
                          }}
                          required
                        />
                      </center>
                    </div>
                  </div>
                  <br></br>

                  <div className>
                    <div>
                      <center>
                        <input
                          placeholder="Enter total amount"
                          type="number"
                          className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                          onChange={(e) => {
                            setTotal(e.target.value);
                          }}
                          onInput={(e) => {
                            const total = parseFloat(e.target.value);
                            if (isNaN(total) || total <= 0) {
                              e.target.setCustomValidity(
                                "Please enter a number greater than 0."
                              );
                            } else {
                              e.target.setCustomValidity("");
                              setTotal(total);
                            }
                          }}
                          required
                        />
                      </center>
                    </div>
                  </div>
                  <br></br>
                </div>

                <div className="flex mt-8 h-10">
                  <button
                    type="reset"
                    className="text-white bg-[#FF9F00] hover:bg-[#2E4960] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-l sm:w-auto px-20 py-5.5 text-center ml-[130px] mb-[10px] mt-[-8px]"
                  >
                    <Link to="../StockBudgetRequests">Cancel</Link>
                  </button>

                  <button
                    type="submit"
                    className="text-white bg-[#FF9F00] hover:bg-[#2E4960] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-l sm:w-auto px-20 py-5.5 text-center ml-[130px] mb-[10px] mt-[-8px]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>{" "}
      {/*Right Side container end*/}
    </div> //Main container end
  );
}
