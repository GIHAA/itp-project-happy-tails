import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import inv from "../assets/inv.jpg";
import SupplierSideBar from "./SupplierSideBar";
import filterImg from "../assets/filter.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventStockReqs() {
    const [stockreqs, setStockRequests] = useState([]);
  const [total, setTotal] = useState([]);
  const [eventAmount, setEventAmount] = useState([]);

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

  useEffect(() => {
    async function geteamount() {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/eventamount/geteamounts"
        );
        console.log(res.data.alleamount);
        setEventAmount(res.data.alleamount);
      } catch (err) {
        toast.error(err);
      }
    }
    geteamount();
  }, []);

  async function handleSend(id, eid, eventName, items, description,totalExpense){
    if(totalExpense < 1)
      toast.error(`Please enter valid amount`, {position: toast.POSITION.BOTTOM_RIGHT,})
    else{
        
      try {
        const newStock = {
          eid,
          eventName,
          items,
          description,
          status: "Sent",
        };
  
        await axios.put(`http://localhost:8080/api/eventstock/editstock/${id}`,newStock);
        toast.success("Stock Sent Successfully");
      } catch (err) {
        toast.error(err);
      }

      const amount = eventAmount.find((amount) => amount.eid === eid);
      const eventAmountId = amount ? amount._id : null;
      console.log(eventAmountId);
      const res = await axios.get(`http://localhost:8080/api/eventamount/geteamount/${eventAmountId}`);
      console.log(res.data.eamount)
      const singleData = res.data.eamount;

      var totalin = singleData.totalIncome;
      var finalResult;
      var finalRate;

      if (totalExpense === 0 || totalin === 0) {
        finalResult = "Not started";
        finalRate = 0;
      } else {
        finalResult = totalin > totalExpense ? "Profit" : "Loss";
        finalRate = ((totalin - totalExpense) / totalExpense) * 100;
      }

      const newamount = {
        eid: eid,
        eventName: singleData.eventName,
        price: singleData.price,
        noOfTicket: singleData.ticketCount,
        totalIncome: singleData.totalin,
        totalExpense: totalExpense,
        result: finalResult,
        rate: finalRate,
      };

      axios.put(`http://localhost:8080/api/eventamount/editeamount/${eventAmountId}`,newamount
      ).catch((error) => console.error("Error updating event amount:", error));

    }
  }



  return (
    //Main container
    <div className="flex scroll-smooth">
        <SupplierSideBar />
      {/*Right Side container start*/}
      <div className="bg-[#d9d9d9] flex-[85%]">
        {/*Header Part*/}
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">
            EVENT STOCK REQUESTS
          </h1>

          <div className="flex">
            <div className=" flex p-5">
              {/* <Link
                to="/stockin"
                className=" bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                Received
              </Link> */}
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
                {stockreqs.filter((val) => {
                     if (val.status.toLowerCase() === "accepted") {
                        return true;
                      } else{
                        return false;
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
                              className={`inline-block px-2 rounded-xl text-sm bg-green-200 text-green-800"`}
                            >
                              {req.status}
                            </span>
                          </td>

                          <td className="p-3">
                            
                              <div className="flex">
                              <input type="number"
                                placeholder="Enter total.." 
                                onChange={(e)=> {
                                    setTotal(e.target.value)
                                }}
                                className=" bg-[#E4EBF7]  text-gray-900 border-0 border-b-2 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]" 
                                required/>

                              <button
                                onClick={() => handleSend( req._id, req.eid, req.eventName, req.items, req.description, total)}
                                className="px-2 py-1 mr-5 w-28 bg-[#2E4960] text-white font-semibold hover:bg-[#ffc05a] rounded-xl "
                              >
                                ✓ Send
                              </button>
                              </div>
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
