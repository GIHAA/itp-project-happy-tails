import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import name from "../../assets/logo.png";
//import { getEvents} from '../service/api';
import "jspdf-autotable";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Report = () => {
  const [events, setEvent] = useState([]);
  const [eventName, setEname] = useState("");
  const [price, setPrice] = useState(0);
  const [noOfTicket, setCount] = useState(0);
  const [totalIncome, setIncome] = useState(0);
  const [totalExpense, setExpense] = useState(0);
  const [result, setResult] = useState("");
  const [rate, setRate] = useState("");
  const [Register, setRegister] = useState([]);
  const [budgetRequests, setBudgetRequests] = useState([]);

  useEffect(() => {
    async function getevents() {
      try {
        const res3 = await axios.get(
          "http://localhost:8080/api/event/getEvents"
        );
        setEvent(res3.data.allevents);
      } catch (err) {
        toast.error(err);
      }
    }

    getevents(); // call the function to fetch events
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF("landscape", "px", "a4", false);
    const imgWidth = 500;
    const imgHeight = 400;
    const xPos = 65;
    const yPos = 20;

    // Draw gray rectangle
    doc.setFillColor(200);
    doc.rect(xPos, yPos, imgWidth, imgHeight, "F");

    // Add image on top of rectangle
    doc.addImage(name, "JPG", xPos, yPos, imgWidth, imgHeight);
    doc.addPage();

    doc.setFontSize(18);
    doc.setTextColor("#444444");
    doc.text("Happy Tails", doc.internal.pageSize.width / 2, 30, {
      align: "center",
    });
    doc.text("All Event Report", doc.internal.pageSize.width / 2, 50, {
      align: "center",
    });

    // Add horizontal line after the header
    doc.setLineWidth(0.5);
    doc.setDrawColor("#444444");
    doc.line(20, 60, doc.internal.pageSize.width - 20, 60);

    const headers = [
      "Event ID",
      "Event Name",
      "Description",
      "Date",
      "Start Time",
      "End Time",
      "Venue",
      "Price",
    ];
    const data = events.map((event) => [
      event.eid,
      event.name,
      event.description,
      event.date,
      event.startTime,
      event.endTime,
      event.venue,
      event.price,
    ]);

    // Set table margin to center horizontally and position vertically up from top
    const tableWidth = 500; // Adjust table width as needed
    const tableHeight = 30 + data.length * 10; // Adjust table height as needed
    const horizontalMargin =
      (doc.internal.pageSize.getWidth() - tableWidth) / 2;
    const verticalMargin = 100; // Adjust vertical margin as needed
    const startY = verticalMargin - 20; // Subtract 20 to offset for table header

    // Create table with margin and didDrawPage properties
    doc.autoTable({
      head: [headers],
      body: data,
      margin: { top: startY, left: horizontalMargin, right: horizontalMargin },
      didDrawPage: (data) => {
        data.settings.margin.top = startY;
      },
    });

    doc.save("AllEventReport.pdf");
  };

  function filterContent(report, searchTerm) {
    const result = report.filter(
      (r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.eid.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEvent(result);
  }
  const handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    axios.get("http://localhost:8080/api/event/getEvents").then((res) => {
      console.log(res.data.allevents);
      if (res.data.allevents) {
        filterContent(res.data.allevents, searchTerm);
      }
    });
  };

  return (
    <>
      <div class="p-4 sm:ml-64" style={{ marginTop: "90px" }}>
        <div class="pb-4 bg-white " style={{ marginRight: "5px" }}>
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative mt-1 flex-shrink-0">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              onChange={handleTextSearch}
              class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{ marginRight: "5px" }}
              placeholder="Search for Event Name or Event ID"
            />
          </div>
        </div>
        <span style={{ marginRight: "10px", fontSize: "20px" }}>
          All Events
        </span>
        <button
          style={{ backgroundColor: "#459DE8" }}
          className="block bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text mx-auto p-2 rounded-full w-40"
          onClick={generatePDF}
        >
          Download PDF
        </button>

        <div
          class="relative overflow-x-auto shadow-md sm:rounded-lg"
          style={{ marginTop: "10px" }}
        >
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              style={{ backgroundColor: "#FF9F00" }}
            >
              <tr>
                <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                  Event ID
                </th>
                <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                  Event Name
                </th>
                <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                  Description
                </th>
                <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                  Date
                </th>
                <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                  Start Time
                </th>
                <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                  End Time
                </th>

                <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                  Venue
                </th>
                <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map((event, index) => (
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    style={{ backgroundColor: "#DBD9D5" }}
                  >
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {event.eid}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {event.name}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {event.description}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {event.date}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {event.startTime}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {event.endTime}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {event.venue}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {event.price}
                    </td>
                  </tr>
                ))
              ) : (
                <td
                  colSpan="7"
                  style={{ backgroundColor: "#D5ABAF", fontSize: "20px" }}
                >
                  No events found.
                </td>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Report;
