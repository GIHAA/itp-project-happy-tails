import React, { useState, useEffect } from "react";
import axios from "axios";
import inv from "../assets/inv.jpg";
import InventorySideBar from "./InventorySideBar";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/logo2.png";
const moment = require("moment");

export default function InvDashboard() {
  const [releasedProcessed, setReleasedProcessed] = useState([]);
  const [receivedProcessed, setReceivedProcessed] = useState([]);
  const [inStockProcessed, setInStockProcessed] = useState([]);
  const [stockReq, setStockReq] = useState([]);
  const [stockReqReport, setStockReqReport] = useState([]);
  const [stockRel, setStockRel] = useState([]);
  const [stockRelReport, setStockRelReport] = useState([]);
  const [stockReqPending, setStockReqPending] = useState([]);

  useEffect(() => {
    const fetchStockOut = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/inventory/releasestockprocessed"
        );
        console.log(data);

        const now = moment();
        const month = now.format("MMMM");

        setReleasedProcessed({
          labels: data.map((item) => item._id),
          datasets: [
            {
              label: `No released items by category in ${month}`,
              data: data.map((item) => item.total_released_qty),
              backgroundColor: [
                "#B9EDDD",
                "#F2E3DB",
                "#DDFFBB",
                "#B9E9FC",
                "#F3E8FF",
                "#E5D1FA",
                "#EDDBC7",
              ],
            },
          ],
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchStockOut();
  }, []);

  //-----------------------------------------------------------------------
  useEffect(() => {
    const fetchStockIn = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/inventory/receivedstockprocessed"
        );
        console.log(data);

        const now = moment();
        const month = now.format("MMMM");

        setReceivedProcessed({
          labels: data.map((item) => item._id),
          datasets: [
            {
              label: `No of received items by category in ${month}`,
              data: data.map((item) => item.total_received_qty),
              backgroundColor: [
                "#B9EDDD",
                "#F2E3DB",
                "#DDFFBB",
                "#B9E9FC",
                "#F3E8FF",
                "#E5D1FA",
                "#EDDBC7",
              ],
            },
          ],
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchStockIn();
  }, []);

  //-----------------------------------------------------------------------
  useEffect(() => {
    const fetchInStock = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/inventory/items/qtyprocessed"
        );
        console.log(data);

        setInStockProcessed({
          labels: data.map((item) => item._id),
          datasets: [
            {
              label: `All in stock items by category`,
              data: data.map((item) => item.total_qty_in),
              backgroundColor: [
                "#B9EDDD",
                "#F2E3DB",
                "#DDFFBB",
                "#B9E9FC",
                "#F3E8FF",
                "#E5D1FA",
                "#EDDBC7",
              ],
            },
          ],
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchInStock();
  }, []);

  // function generatePDF() {
  //   const canvas = document.querySelector("#canvas");

  //   if (!canvas) {
  //     console.error("Canvas element not found");
  //     return;
  //   }

  //   html2canvas(canvas)
  //     .then(function (canvas) {
  //       const imgData = canvas.toDataURL('image/png');
  //       const doc = new jsPDF('p', 'mm');

  //       // Resize the image to 50mm width and 50mm height
  //       doc.addImage(imgData, 'PNG', 1, 10, 200, 140);

  //       doc.save('report.pdf');
  //     })
  //     .catch(function (error) {
  //       console.error("Error generating PDF:", error);
  //     });
  // }

  const generatePDF = () => {
    const now = moment();
    const month = now.format("MMMM"); //april,july
    const date2 = now.format("YYYY-MM"); //2023-02

    const title = "Inventory Data Report";
    const doc = new jsPDF();
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
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
    doc.addImage(logo, "JPG", 20, 60, 40, 40);
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

  
    doc.text(85, 115, `Received Stocks In ${month}`);

    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.autoTable({
      startY: 120,
      head: [
        [
          "Date",
          "Item code",
          "Item name",
          "Item brand",
          "Category",
          "Quantity",
        ],
      ],
      body: stockReqReport
        .filter((item) => item.rec_date.includes(date2))
        .map((item) => [
          item.rec_date,
          item.item_code,
          item.item_name,
          item.item_brand,
          item.category,
          item.qty,
        ]),
      theme: "striped",
    });

    const previousAutoTable = doc.lastAutoTable;

    doc.setFontSize(10);
    doc.setTextColor("#999999");
    doc.text(85, previousAutoTable.finalY + 30, `Released Stocks In ${month}`);

    doc.autoTable({
      startY: previousAutoTable.finalY + 35,
      head: [
        [
          "Date",
          "Item code",
          "Item name",
          "Item brand",
          "Category",
          "Quantity",
        ],
      ],
      body: stockRelReport
        .filter((item) => item.date.includes(date2))
        .map((item) => [
          item.date,
          item.item_code,
          item.item_name,
          item.item_brand,
          item.category,
          item.releaseQty,
        ]),

      theme: "striped",
    });

    doc.save("Report.pdf");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/inventory/stockrequest/")
      .then((res) => {
        const items = res.data;
        const receivedItems = items.filter(
          (item) => item.status === "received"
        );
        setStockReqReport(receivedItems);
        receivedItems.sort(
          (a, b) =>
            moment(b.rec_date, "YYYY-MM-DD, hh:mm a") -
            moment(a.rec_date, "YYYY-MM-DD, hh:mm a")
        );
        const lastFiveReceivedItems = receivedItems.slice(0, 5); // get only the last 5 records by the rec_date field
        setStockReq(lastFiveReceivedItems);
      })
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/inventory/stockrequest/")
      .then((res) => {
        const items = res.data;
        const pendingItems = items.filter((item) => item.status === "pending");
        pendingItems.sort(
          (a, b) =>
            moment(b.date, "YYYY-MM-DD, hh:mm a") -
            moment(a.date, "YYYY-MM-DD, hh:mm a")
        );
        const lastFivePendingItems = pendingItems.slice(0, 5); // get only the last 5 records by the rec_date field
        setStockReqPending(lastFivePendingItems);
      })
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/inventory/readreleasestock/")
      .then((res) => {
        const items = res.data;
        setStockRelReport(items);
        items.sort(
          (a, b) =>
            moment(b.date, "YYYY-MM-DD, hh:mm a") -
            moment(a.date, "YYYY-MM-DD, hh:mm a")
        );
        const lastFiveReleasedItems = items.slice(0, 5);
        setStockRel(lastFiveReleasedItems);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    //Main container
    <div className="flex scroll-smooth">
      <InventorySideBar />
      {/*Right Side container start*/}
      <div className=" flex-[85%]">
        {/*Body Part*/}
        <div
          style={{ backgroundImage: `url(${inv})` }}
          className="bg-cover bg-center h-screen w-full fixed"
        >
          <div className=" bg-[#2E4960] flex place-content-around w-[85%]">
            <h1 className=" text-center text-4xl text-slate-50 p-8">
              INVENTORY MANAGEMENT DASHBOARD
            </h1>

            <div>
              <button className=" bg-slate-300 p-3 mt-7" onClick={generatePDF}>
                Generate Report
              </button>
            </div>
          </div>

          {/*White box*/}
          <div
            id="canvas"
            className=" bg-[#f3f3f3] w-[85%] h-[100%] absolute overflow-scroll"
          >
            <div className="mt-4 ml-4">
              <div className=" flex place-content-around h-[350px] mt-5">
                {inStockProcessed && inStockProcessed.datasets && (
                  <div className=" w-2/6 h-full bg-white p-20 shadow-lg rounded-xl">
                    <Pie
                      data={inStockProcessed}
                      options={{
                        plugins: {
                          legend: { position: "right" },
                          title: { display: true, text: "Items In Stock" },
                        },
                      }}
                    />
                  </div>
                )}

                <div className=" w-7/12 h-full bg-white p-5 shadow-lg rounded-xl">
                  <span className=" text-lg font-light ml-[290px]">
                    Sent Requests
                  </span>
                  {/*Table*/}
                  <table className=" w-full shadow-md rounded-lg mt-8">
                    <thead className="">
                      <tr className=" bg-slate-200 font-normal">
                        <th className="pl-2">requested date</th>
                        <th className="pl-2">item_name</th>
                        <th className="pl-2">item_brand</th>
                        <th className="pl-2">qty</th>
                        <th className="pl-2">status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {stockReqPending.map((stockrequest) => {
                        return (
                          <tr className=" font-light">
                            <td className="px-3 pb-2">{stockrequest.date}</td>
                            <td className="px-3 pb-2">
                              {stockrequest.item_name}
                            </td>
                            <td className="px-3 pb-2">
                              {stockrequest.item_brand}
                            </td>
                            <td className="px-3 pb-2">{stockrequest.qty}</td>
                            <td className="px-3 pb-2">{stockrequest.status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className=" flex place-content-around h-[350px] mt-5">
                {releasedProcessed && releasedProcessed.datasets && (
                  <div className=" w-6/12 h-full bg-white p-20 shadow-lg rounded-xl">
                    <Bar data={releasedProcessed} />
                  </div>
                )}

                <div className=" w-5/12 h-full bg-white p-5 shadow-lg rounded-xl">
                  <span className=" text-lg font-light ml-[190px]">
                    {" "}
                    Released Items
                  </span>
                  {/*Table*/}
                  <table className=" shadow-md rounded-lg mt-8 w-full">
                    <thead className="">
                      <tr className=" bg-slate-200 font-normal">
                        <th className="pl-3">released date</th>
                        <th className="pl-3">item_name</th>
                        <th className="pl-3">item_brand</th>
                        <th className="px-3">qty</th>
                      </tr>
                    </thead>

                    <tbody>
                      {stockRel.map((stockrelease) => {
                        return (
                          <tr className=" font-light">
                            <td className="px-3 pb-2">{stockrelease.date}</td>
                            <td className="px-3 pb-2">
                              {stockrelease.item_name}
                            </td>
                            <td className="px-3 pb-2">
                              {stockrelease.item_brand}
                            </td>
                            <td className="px-3 pb-2">
                              {stockrelease.releaseQty}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className=" flex place-content-around h-[500px] mt-5">
                {receivedProcessed && receivedProcessed.datasets && (
                  <div className="w-6/12 h-full bg-white p-20 shadow-lg rounded-xl">
                    <Bar data={receivedProcessed} />
                  </div>
                )}

                <div className=" w-5/12 h-full bg-white p-5 shadow-lg rounded-xl">
                  <span className=" text-lg font-light ml-[190px]">
                    {" "}
                    Received Items
                  </span>
                  {/*Table*/}
                  <table className=" shadow-md rounded-lg mt-8">
                    <thead className="">
                      <tr className=" bg-slate-200 font-normal">
                        <th className="pl-3">received date</th>
                        <th className="pl-3">item_name</th>
                        <th className="pl-3">item_brand</th>
                        <th className="pl-3">qty</th>
                        <th className="pl-3">status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {stockReq.map((stockrequest) => {
                        return (
                          <tr className=" font-light">
                            <td className="px-3 pb-2">
                              {stockrequest.rec_date}
                            </td>
                            <td className="px-3 pb-2">
                              {stockrequest.item_name}
                            </td>
                            <td className="px-3 pb-2">
                              {stockrequest.item_brand}
                            </td>
                            <td className="px-3 pb-2">{stockrequest.qty}</td>
                            <td className="px-3 pb-2">{stockrequest.status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className=" h-52"></div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/*Right Side container end*/}
    </div> //Main container end
  );
}
