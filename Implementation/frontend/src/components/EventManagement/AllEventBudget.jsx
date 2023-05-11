import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AllEventBudget = () => {
  const [budgetRequests, setBudgetRequests] = useState([]);
  const [eid, setId] = useState("");
  const [eventAmount, setEventAmount] = useState({});
  const [amountName, setAmountName] = useState("");
  const [amountPrice, setAmountPrice] = useState("");
  const [amountTicket, setAmountTicket] = useState("");
  const [amountIncome, setAmountIncome] = useState("");
  const [amountExpense, setAmountExpense] = useState("");
  const [amountResult, setAmountResult] = useState("");
  const [amountRate, setAmountRate] = useState("");
  const [amountOID, setAmountOID] = useState(null);
  const [amountId, setAmountID] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [dbprice, setDPrice] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/eventbudget/getBudgets")
      .then((res) => {
        console.log(res);
        setBudgetRequests(res.data.allbudget);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error: ${err}`);
      });
  }, []);

  const onDelete = (id) => {
    // if(status === "Accepted" && amountStatus === "Paid"){
    //   toast.error("This event has already been accepted and paid by the financial manager. You cannot deleted this.");

    // }
    axios
      .delete(`http://localhost:8080/api/eventbudget/deleteBudget/${id}`)
      .then((res) => {
        toast.success("Requested budget Deleted!!");
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure, you want to delete this budget request?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            onDelete(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  function filterContent(report, searchTerm) {
    const result = report.filter(
      (r) =>
        r.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.eid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.budgetid.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBudgetRequests(result);
  }

  const handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    axios
      .get("http://localhost:8080/api/eventbudget/getBudgets")
      .then((res) => {
        console.log(res.data.allbudget);
        if (res.data.allbudget) {
          filterContent(res.data.allbudget, searchTerm);
        }
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
                class="w-5 h-5 text-gray-500"
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
              placeholder="Search for Event Name or Event Id or Request Id"
            />
          </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div class="flex flex-row-reverse space-x-1 space-x-reverse ...">
            <div className="mb-4">
              <button
                style={{ backgroundColor: "#1FE23F" }}
                className="block bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text mx-auto p-2 rounded-full w-40"
              >
                <Link to={"/eventdashboard/addBudget"}>Request Budget</Link>
              </button>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">Budget Requests</h1>

          {budgetRequests.length > 0 ? (
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
                    Request ID
                  </th>
                  <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                    Event Name
                  </th>
                  <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                    Description
                  </th>
                  <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                    Requested Date,Time
                  </th>
                  <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                    Product - Amount
                  </th>

                  <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                    Total
                  </th>
                  <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3" style={{ color: "white" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {budgetRequests.map((request, index) => (
                  <tr
                    key={request.eventName}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    style={{ backgroundColor: "#DBD9D5" }}
                  >
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {request.eid}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {request.budgetid}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {request.eventName}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {request.description}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {new Date(request.submittedAt).toLocaleString()}
                    </td>

                    {request.items.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td style={{ color: "black" }}>
                          {item.product} - {item.amount}
                        </td>
                        {/** <td class="px-6 py-4" style={{color: 'black'}}>{item.amount}</td>*/}
                      </tr>
                    ))}
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {request.total}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      {request.status}
                    </td>
                    <td class="px-6 py-4" style={{ color: "black" }}>
                      <div className="flex justify-center">
                        {request.status === "Accepted" &&
                        request.amountStatus === "Paid" ? (
                          <div className="flex justify-center">
                            <button
                              style={{
                                backgroundColor: "#99ccff",
                                marginRight: "20px",
                              }}
                              className="block bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text mx-auto p-2 rounded-full w-20"
                              onClick={() =>
                                toast.error(
                                  "This event has already been accepted by the financial manager. You cannot edit this."
                                )
                              }
                            >
                              Edit
                            </button>
                            <button
                              style={{ backgroundColor: "#ff9980" }}
                              className=" bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text mx-auto p-2 rounded-full w-20"
                              onClick={() =>
                                toast.error(
                                  "This event has already been accepted by the financial manager. You cannot delete this."
                                )
                              }
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <button
                              style={{
                                backgroundColor: "#459DE8",
                                marginRight: "20px",
                              }}
                              className="block bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text mx-auto p-2 rounded-full w-20"
                            >
                              <Link
                                to={`/eventdashboard/editbudget/${request._id}`}
                              >
                                Edit
                              </Link>
                            </button>
                            <button
                              style={{ backgroundColor: "#D12222" }}
                              className=" bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text mx-auto p-2 rounded-full w-20"
                              onClick={() => handleDelete(request._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ backgroundColor: "#D5ABAF" }}>
              No budget requests found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllEventBudget;
