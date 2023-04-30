import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function AllRegisterEvent() {
  const [Register, setRegister] = useState([]);
  const [eventAmount, setEventAmount] = useState([]);
  const [singleAmount, setSingleAmount] = useState([]);
  useEffect(() => {
    async function getbooking() {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/eventregister/getbooking"
        );
        console.log(res.data.allbooking);
        setRegister(res.data.allbooking);

        // console.log(res.data.allbooking)
      } catch (err) {
        toast.error(err);
      }
    }

    getbooking();
  }, []);

  function filterContent(report, searchTerm) {
    const result = report.filter(
      (r) =>
        r.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.eid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.bookid.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRegister(result);
  }

  const handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    axios
      .get("http://localhost:8080/api/eventregister/getbooking")
      .then((res) => {
        if (res.data.allbooking) {
          filterContent(res.data.allbooking, searchTerm);
        }
      });
  };

  useEffect(() => {
    async function getevents() {
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

    getevents();
  }, []);

  const onDelete = async (id, eid, count, total) => {
    const amount = eventAmount.find((amount) => amount.eid === eid);
    console.log(amount);
    const eventAmountId = amount ? amount._id : null;
    console.log(eventAmountId);
    const res = await axios.get(
      `http://localhost:8080/api/eventamount/geteamount/${eventAmountId}`
    );
    console.log(res.data.eamount);
    const singleData = res.data.eamount;

    var ticketCount = Number(singleData.noOfTicket) - Number(count);
    var totalin = Number(singleData.totalIncome) - Number(total);

    var totalex = singleData.totalExpense;
    var finalResult;
    var finalRate;

    if (totalex === 0 || totalin === 0) {
      finalResult = "Not started";
      finalRate = 0;
    } else {
      finalResult = totalin > totalex ? "Profit" : "Loss";
      finalRate = ((totalin - totalex) / totalex) * 100;
    }

    const newamount = {
      eid: eid,
      eventName: singleData.eventName,
      price: singleData.price,
      noOfTicket: ticketCount,
      totalIncome: totalin,
      totalExpense: totalex,
      result: finalResult,
      rate: finalRate,
    };

    Promise.all([
      axios
        .delete(`http://localhost:8080/api/eventregister/deletebook/${id}`)
        .catch((error) => console.error("Error deleting booking:", error)),
      axios
        .put(
          `http://localhost:8080/api/eventamount/editeamount/${eventAmountId}`,
          newamount
        )
        .catch((error) => console.error("Error updating event amount:", error)),
    ])
      .then((res) => {
        toast.success("Booking Deleted!!");
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      })
      .catch((err) => {
        toast.error("err");
      });
  };

  const handleDelete = (bookid, eid, count, total) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure, you want to delete this registered booking?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            onDelete(bookid, eid, count, total);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <>
      <div class="p-4 sm:ml-64" style={{ marginTop: "90px" }}>
        <div class="pb-4 bg-white">
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative mt-1">
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
              class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-96 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by Event Name or Event ID or Booked ID"
            />
          </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className="text-2xl font-bold mb-4">All Booking</h1>
          {Register.length > 0 ? (
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
                    Booked ID
                  </th>
                  <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                    Event Name
                  </th>
                  <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                    Customer Name
                  </th>

                  <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                    Email
                  </th>
                  <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                    Phone number
                  </th>
                  <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                    Number of ticket
                  </th>
                  <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                    Total
                  </th>
                  <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Register.map((Register) => (
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    style={{ backgroundColor: "#DBD9D5" }}
                  >
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {Register.eid}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {Register.bookid}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {Register.eventName}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {Register.cusName}
                    </td>

                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {Register.email}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {Register.phoneNumber}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {Register.noOfTicket}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {Register.total}
                    </td>

                    <td class="px-6 py-4" style={{ color: "black" }}>
                      <div className="flex justify-center">
                        <div>
                          <button
                            style={{
                              backgroundColor: "#459DE8",
                              marginRight: "20px",
                            }}
                            className="block bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text mx-auto p-2 rounded-full w-20"
                          >
                            <Link
                              to={`/eventdashboard/editbooking/${Register._id}`}
                            >
                              Edit
                            </Link>
                          </button>
                        </div>
                        <button
                          style={{
                            backgroundColor: "#D12222",
                            marginRight: "20px",
                          }}
                          className=" bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text mx-auto p-2 rounded-full w-20"
                          onClick={() =>
                            handleDelete(
                              Register._id,
                              Register.eid,
                              Register.noOfTicket,
                              Register.total
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ backgroundColor: "#D5ABAF" }}>
              No registered event found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
