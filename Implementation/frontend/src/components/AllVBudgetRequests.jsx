import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgimg from "../assets/bgimg.jpg";
import logo2 from "../assets/logo2.png";
import deleteImg from "../assets/delete.png";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
import VSideBar from "./VSideBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AllVBudgetRequests() {
  const [Payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/VehReqPayment/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setPayments(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const generateReport = () => {
    const title = "Budget Requests";
    const doc = new jsPDF();
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    // Set document font and color
    doc.setFont("helvetica");
    doc.setTextColor("#000000");

    // Add title and date
    doc.setFontSize(24);
    doc.text(title, 20, 30);
    doc.setFontSize(12);
    doc.setTextColor("#999999");
    doc.text(`Generated on ${date}`, 20, 40);

    // Add logo and company details
    doc.addImage(logo2, "JPG", 20, 60, 40, 40);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#000000");
    doc.text("Happy Tails", 70, 70);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#999999");
    doc.text("Tel: +94 11 234 5678", 70, 80);
    doc.text("Email: info@happytails.com", 70, 85);
    doc.text("Address: No 221/B, Peradeniya Road, Kandy", 70, 90);

    // Display prompt dialog box to get date range from user
    Swal.fire({
      title: "Enter a date range",
      html:
        '<label for="start-date">Start Date</label><br/>' +
        '<input id="start-date" class="swal2-input" type="date"><br/><br/>' +
        '<label for="end-date">End Date</label><br/>' +
        '<input id="end-date" class="swal2-input" type="date">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("start-date").value,
          document.getElementById("end-date").value,
        ];
      },
    }).then((result) => {
      const [startDateStr, endDateStr] = result.value;
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);

      // Filter data based on date range
      const filteredData = Payments.filter((payment) => {
        const paymentDate = new Date(payment.date);
        return paymentDate >= startDate && paymentDate <= endDate;
      });

      // Add table with filtered data
      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.autoTable({
        startY: 110,
        head: [
          [
            "Title",
            "Plate Number",
            "Require Date",
            "Amount of Payment",
            "Status",
          ],
        ],
        body: filteredData.map((payment) => [
          payment.req_title,
          payment.plateNo,
          payment.date,
          payment.payment,
          payment.status,
        ]),
        theme: "grid",
      });

      // Save the document
      doc.save("Budget Requests for VM.pdf");
    });
  };

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

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  className="px-3 py-1 bg-[#1ab427] rounded-full"
                  style={{ color: "white" }}
                  onClick={() => generateReport()}
                >
                  Generate Report
                </button>
              </div>
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
                  if (searchTerm == "") {
                    return val;
                  } else if (
                    val.plateNo.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  } else if (
                    val.date.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  } else if (
                    val.req_title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
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
            className="flex px-5 py-1 mr-5 bg-[#d11818] text-white font-semibold hover:bg-[#760d0d] rounded-xl "
            style={{ color: "white" }}
            onClick={() => onDelete(props.id)}
          >
            <img
              src={deleteImg}
              alt="deleteimage"
              className="w-4 h-4 mr-2 mt-1"
            />
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
      toast.success("Request removed successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .catch((err) => alert(err));
}
