import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgimg from "../assets/bgimg.jpg";
import axios from "axios";
import VSideBar from "./VSideBar";

export default function AllVBudgetRequests() {
  const [Payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/VehReqPayment/`)
      .then((res) => {
        setPayments(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  console.log(Payments);

  return (
    //Main container
    <div className="flex scroll-smooth">
      <VSideBar />
      {/*Right Side container start*/}
      <div className="bg-[#d9d9d9] flex-[85%]">
        {/*Header Part*/}
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">
            BUDGET REQUESTS
          </h1>

          <div className="flex">
            <div className=" flex p-5">
              <Link
                to="/addvbudget"
                className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                +ADD
              </Link>
            </div>

            {/*Search*/}
            <div className="flex h-10 w-200 mt-3">
              <input
                type="text"
                className=" rounded-3xl py-2.5 px-5 w-[40vh] ml-[800px] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] mr-2"
                placeholder="Search request"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        {/*Body Part*/}
        <div
          style={{ backgroundImage: `url(${bgimg})` }}
          className="bg-cover bg-center h-screen w-full fixed"
        >
          {/*White box*/}
          <div className=" bg-white bg-opacity-90 w-[75%] h-[80%] absolute top-5 left-[80px] overflow-scroll">
            {/*Table*/}
            <table className="mx-auto my-10 w-[1000px]">
              <thead className=" bg-[#FF9F00] text-white sticky top-0">
                <tr>
                  <th className="p-3">Request Title</th>
                  <th className="p-3">Plate Number</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Amount Of Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white text-center">
                {Payments.filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.plateNo.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                }).map((payment) => {
                  return (
                    <TableDataRow
                      id={payment._id}
                      PaymentReq_title={payment.req_title}
                      PaymentPlateNo={payment.plateNo}
                      PaymentDate={payment.date}
                      PaymentPayment={payment.payment}
                      PaymentStatus={payment.status}
                    />
                  );
                })}
              </tbody>
            </table>
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
      <tr>
        <td className="p-3">{props.PaymentReq_title}</td>
        <td className="p-3">{props.PaymentPlateNo}</td>
        <td className="p-3">{props.PaymentDate}</td>
        <td className="p-3">{props.PaymentPayment}</td>
        <td className="p-3">{props.PaymentStatus}</td>

        <td className="p-3">
          <button
            className="px-3 py-1 bg-[#b41a1a] rounded-full "
            style={{ color: "white" }}
            onClick={() => onDelete(props.id)}
          >
            DELETE
          </button>
        </td>
      </tr>
      <hr className="border-2" />
    </>
  );
}

function onDelete(id) {
  axios
    .delete(`http://localhost:8080/api/VehReqPayment/${id}`)
    .then((res) => {
      alert("request deleted");
    })
    .catch((err) => alert(err));
}
