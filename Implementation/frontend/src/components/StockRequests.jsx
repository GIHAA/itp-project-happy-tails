import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SupplierSideBar from "./SupplierSideBar";
import inv from "../assets/inv.jpg";
import { ToastContainer, toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSelector } from "react-redux";
import logo2 from "../assets/logo2.png";

const moment = require("moment");

export default function StockRequests() {
  const [stockReq, setStockReq] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/inventory/stockrequest/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setStockReq(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  // const refreshTable = () => {
  //   axios
  //     .get("http://localhost:8080/api/inventory/stockrequest/")
  //     .then((res) => {
  //       setStockReq(res.data);
  //     })
  //     .catch((err) => alert(err));
  // }

  function generatePDF() {
    const title = "Still Pending Stock Request Report ";
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
    doc.autoTable({
      startY: 105,
      head: [
        ["Date", "Item Code", "Item Name", "Item Brand", "Category", "Qty"],
      ],
      body: stockReq
        .filter((request) => request.status.toLowerCase() === "pending")
        .map((request) => [
          request.date,
          request.item_code,
          request.item_name,
          request.item_brand,
          request.category,
          request.qty,
        ]),
    });
    doc.save("stock-requests.pdf");
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
            NEW STOCK REQUESTS
          </h1>

          <div className="flex mt-2">
            <div className="ml-5">
              <button
                className="bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[7px] rounded-[120px] font-bold text-white text-[11px] block w-[150px] text-center mr-2"
                onClick={generatePDF}
              >
                DOWNLOAD REPORT
              </button>
            </div>
          </div>

          <div className="flex">
            <div className=" flex p-5"></div>
          </div>
        </div>

        {/*Body Part*/}
        <div
          style={{ backgroundImage: `url(${inv})` }}
          className="bg-cover bg-center h-screen w-full fixed"
        >
          {/*White box*/}
          <div className=" bg-white bg-opacity-90 w-[75%] h-[80%] absolute top-5 left-[80px] overflow-scroll">
            {/*Table*/}
            <table className="mx-auto my-10 w-[1000px]">
              <thead className=" bg-[#FF9F00] text-white sticky top-0">
                <tr>
                  <th className="p-3">Requested date</th>
                  <th className="p-3">item_code</th>
                  <th className="p-3">item_name</th>
                  <th className="p-3">item_brand</th>
                  <th className="p-3">category</th>
                  <th className="p-3">qty</th>
                  {/* <th className="p-3">total_amount</th> */}
                  <th className="p-3">status</th>
                  <th className="p-3">action</th>
                </tr>
              </thead>

              <tbody className="bg-white text-center">
                {stockReq.map((stockrequest) => {
                  if (stockrequest.status === "pending") {
                    return (
                      <TableDataRow
                        id={stockrequest._id}
                        itemCode={stockrequest.item_code}
                        itemName={stockrequest.item_name}
                        itemBrand={stockrequest.item_brand}
                        category={stockrequest.category}
                        qty={stockrequest.qty}
                        // totalAmount={stockrequest.totalAmount}
                        date={stockrequest.date}
                        status={stockrequest.status}
                      />
                    );
                  } else {
                    return null;
                  }
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
  const { user } = useSelector((state) => state.auth);
  async function handleClick(id, total_amount) {
    console.log(id);

    //const now = moment();
    //const formatted = now.format('YYYY-MM-DD, h:mm a'); // Returns a formatted date string like "2023-10-10, 4:28 pm"

    try {
      await axios.put(
        `http://localhost:8080/api/inventory/stockrequest/${id}`,
        {
          status: "ACCEPTED",
          total: total_amount,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Status updated", { position: toast.POSITION.TOP_RIGHT });

      setTimeout(() => {
        window.location.href = "#";
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  }

  const [totalAmount, setTotalAmount] = useState(""); // Use state to store the totalAmount value

  // Handle input change
  const handleChange = (value) => {
    setTotalAmount(value); // Update the totalAmount value in state
  };
  return (
    <>
      <tr>
        <td className="p-3">{props.date}</td>
        <td className="p-3">{props.itemCode}</td>
        <td className="p-3">{props.itemName}</td>
        <td className="p-3">{props.itemBrand}</td>
        <td className="p-3">{props.category}</td>
        <td className="p-3">{props.qty}</td>
        {/* <td className="p-3">
          {props.status.toLowerCase() === "pending" ? (
            // <input
            //   type="string"
            //   className="w-full p-1 border-gray-300 border rounded-lg"
            //   onChange={(e) => handleChange(e.target.value)} // Handle input change
            // />
          ) : null}
        </td> */}
        <td className="p-3">{props.status}</td>
        <td className="p-3">
          {props.status.toLowerCase() === "pending" ? (
            <button
              onClick={() => handleClick(props.id, totalAmount)}
              className="px-3 py-1 mr-5 bg-green-300 hover:bg-[#ffc05a] rounded-lg "
            >
              ✓ Accept
            </button>
          ) : null}
        </td>
      </tr>
    </>
  );
}
