import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SupplierSideBar from "./SupplierSideBar";
import { ToastContainer, toast } from "react-toastify";
import stockBgt from "../assets/stockBgt.jpg";
import { useSelector } from "react-redux";

export default function UpdateStockBudgetRequest() {
  const param = useParams();
  const id = param.id;
  console.log(id);

  const [req, setReq] = useState({});
  const [supplier_name, setName] = useState("");
  const [item_name, setItems] = useState("");
  const [description, setDesc] = useState("");
  const [total, setTotal] = useState(0);
  const { user } = useSelector((state) => state.auth);

  async function getRequest() {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/stockBudget/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(res);
      const oneRequest = res.data;
      //console.log(res.data.profile);
      setReq(oneRequest);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getRequest();
  }, []);

  useEffect(() => {
    setItems(req.item_name);
    setName(req.supplier_name);
    setDesc(req.description);
    setTotal(req.total);
  }, [req]);

  async function UpdateData(e) {
    e.preventDefault();

    try {
      const newReq = {
        supplier_name,
        item_name,
        description,
        total,
      };
      console.log(newReq);
      await axios
        .put(`http://localhost:8080/api/stockBudget/${id}`, newReq, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          toast.success("Request details updated", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex scroll-smooth">
      <SupplierSideBar />
      <div className="bg-[#d9d9d9] flex-[85%]">
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5">
            UPDATE REQUEST INFORMATION
          </h1>
          <div className=" flex p-5"></div>
        </div>
        <div
          style={{ backgroundImage: `url(${stockBgt})` }}
          className="bg-cover bg-center h-screen w-full fixed"
        >
          <div className=" bg-white bg-opacity-90 w-[75%] h-[80%] absolute top-5 left-[80px] overflow-scroll">
            <div className="w-[800px] mx-auto rounded-2xl bg-white mt-8">
              <h1 className="text-[#ffffff] bg-[#FF9F00] rounded-t-2xl font-bold text-3xl h-20 mb-4 pt-5 text-center drop-shadow-md">
                Enter New Details
              </h1>
              <form className="mx-auto" onSubmit={UpdateData}>
                <div className="px-4">
                  <div className="flex mb-10">
                    <div className=" w-[50%] ">
                      <label className="">Supplier Name :</label>
                      <input
                        type="text"
                        className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        value={supplier_name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label className="">Item Name :</label>
                      <input
                        type="text"
                        className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        value={item_name}
                        onChange={(e) => {
                          setItems(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex mb-10">
                    <div className=" w-[50%] mb-6 ">
                      <label className="">Description :</label>
                      <input
                        type="text"
                        className="block rounded-3xl py-2.5 px-5 
                        w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 
                        appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] "
                        value={description}
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex mb-10">
                    <div className="w-[50%] mb-6">
                      <label className="">Total Amount :</label>
                      <input
                        type="text"
                        className="block rounded-3xl py-2.5 px-5 
                        w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 
                        appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] "
                        value={total}
                        onChange={(e) => {
                          setTotal(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <center>
                  {" "}
                  <button
                    type="submit"
                    className="text-white bg-[#FF9F00] hover:bg-
                  [#2E4960] mb-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold 
                  rounded-lg text-l w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Submit
                  </button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>{" "}
      {/*Right Side container end*/}
    </div> //Main container end
  );
}
