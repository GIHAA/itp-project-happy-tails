import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import inv from "../assets/inv.jpg";
import InventorySideBar from "./InventorySideBar";
import filterImg from "../assets/filter.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InvEventStocks() {
  const [stockreqs, setStockRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/eventstock/getStocks")
      .then((res) => {
        console.log(res.data.getstocks);
        setStockRequests(res.data.getstocks);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error: ${err}`);
      });
  }, []);


  async function handleClick(id, eid, eventName, items, description, response){

      try {
        const newStock = {
          eid,
          eventName,
          items,
          description,
          status: response,
        };
  
        await axios.put(`http://localhost:8080/api/eventstock/editstock/${id}`,newStock);
        response === "Rejected" ? toast.success("Request Rejected") : toast.success("Request Accepted");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (err) {
        toast.error(err);
      }
  }

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
            EVENT STOCK REQUESTS
          </h1>

          <div className="flex">
            <div className=" flex p-5">
              <Link
                to="/stockin"
                className=" bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                Received
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
          <div className="relative mt-6 ml-[1100px] mb-1">
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
                <option value="rejected">Rejected</option>
                <option value="sent">Sent</option>
              </select>
            </div>

            {/*Table*/}
            <table className="mx-auto w-[1250px]">
              <thead className=" bg-[#FF9F00] text-white sticky top-0">
                <tr>
                  <th className="p-3">Request ID</th>
                  <th className="p-3 w-[150px]">Event Name</th>
                  <th className="p-3 w-[250px]">Product - Quantity</th>
                  <th className="p-3 w-[250px]">Description</th>
                  <th className="p-3 w-[150px]">Requested Date,Time</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white text-center">
                {stockreqs.sort((a, b) => {
                  if (a.status.toLowerCase() === 'pending') {
                    return -1; 
                  } else if (b.status.toLowerCase() === 'pending') {
                    return 1; 
                  } else {
                    return 0;
                  }
                }).filter((val) => {
                    if (statusFilter === "") {
                      return val;
                    } else if (
                      statusFilter.toLowerCase() === val.status.toLowerCase()
                    ) {
                      return val;
                    }
                  }).map((req) => {
                    return (
                      <>
                        <tr className="hover:bg-[#efeeee]">
                          <td className="p-3">{req.stockid}</td>
                          <td className="p-3 w-[150px]">{req.eventName}</td>
                          
                          {req.items.map((item, itemIndex) => ( 
                            <tr key={itemIndex}>
                              <td className="p-3 w-[250px]">
                                {item.product} - {item.quantity}
                              </td>
                              {/** <td class="px-6 py-4" style={{color: 'black'}}>{item.quantity}</td>*/}
                            </tr>
                          ))}
                          <td className="p-3 w-[250px]">{req.description}</td>

                          <td className="p-3 w-[150px]" >
                            {new Date(req.submittedAt).toLocaleString()}
                          </td>

                          <td className="p-3">
                            <span
                              className={`inline-block px-2 rounded-xl text-sm ${
                                req.status.toLowerCase() === "pending"
                                  ? "bg-yellow-200 text-yellow-800"
                                  : req.status.toLowerCase() === "accepted"
                                  ? "bg-green-200 text-green-800"
                                  : req.status.toLowerCase() === "sent"
                                  ? "bg-blue-200 text-blue-800"
                                  : "bg-red-500 text-red-100"
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>

                          <td className="p-3">
                            {req.status.toLowerCase() === "pending" ? 
                              <div className="flex">

                              <button
                                onClick={() => handleClick( req._id, req.eid, req.eventName, req.items, req.description, "Accepted")}
                                className="px-2 py-1 mr-5 w-28 bg-[#2E4960] text-white font-semibold hover:bg-[#ffc05a] rounded-xl "
                              >
                                ✔️ Accept
                              </button>

                              
                              <button
                                onClick={() => handleClick( req._id, req.eid, req.eventName, req.items, req.description, "Rejected")}
                                className="px-2 py-1 mr-5 w-28 bg-[#2E4960] text-white font-semibold hover:bg-[#ffc05a] rounded-xl "
                              >
                                ❌Reject
                              </button>
                              </div>

                              : req.status.toLowerCase() === "rejected" ? 
                               "You have rejected the request"
                               : req.status.toLowerCase() === "sent" ? 
                               "Supplier manager has sent the stocks"
                              : "You have accepted the request"
                          }
                          </td>
                        </tr>
                      </>
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
