import React, { useState, useEffect } from "react";
import axios from "axios";
import PostTransaction from "./POSTTranfer";
import { toast } from "react-toastify";

const GetTransaction = () => {
  const [transData, setTransData] = useState([]);
  const [isError, setIsError] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPayData, setFilteredPayData] = useState([]);

  const income = transData.reduce(
    (total, { tran_amount }) => total + tran_amount,
    0
  );
  const newestTransaction = transData[transData.length - transData.length];
  const amount = newestTransaction ? newestTransaction.tran_amount : 0;
  const balance = income - amount;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/transaction")

      .then((response) => {
        setTransData(response.data);

        filterPayments(response.data);
      })

      .catch((error) => setIsError(error.message));
  }, []);

  const deleteTransaction = (id) => {
    axios
      .delete(`http://localhost:8080/api/transaction/${id}`)
      .then((res) => {
        refreshPage();
      })

      .catch((err) => {
        alert(err);
      });

    function refreshPage() {
      window.location.reload(false);
    }
  };

  const updateTransaction = (id, data) => {
    axios
      .put(`http://localhost:8080/api/transaction/${id}`, data)
      .then((res) => {
        refreshPage();
      })
      .catch((err) => {
        alert(err);
      });

    function refreshPage() {
      setTimeout(function () {
        window.location.reload(false);
      }, 2000);
    }
  };

  function filterPayments(data) {
    const filtered = data.filter((payment) =>
      payment.tran_title
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredPayData(filtered);
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredPayData(transData);
    } else {
      filterPayments(transData);
    }
  }


  

  return (
    <>
      {/* //BALANCE BAR */}

      <div class="flex  ml-48 justify-center flex-cols-1 gap-4 mt-28 ">
        <div class=" bg-[#2E4960] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="flex stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-2xl"> &nbsp; Rs. {balance}</p>
            <p>Balances</p>
          </div>
        </div>
        <div class="bg-[#2E4960] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div class=" flex justify-center items-center gap-4 w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-2xl">&nbsp; Rs. {amount}</p>
            <p>Income</p>
          </div>
        </div>
        <div class="bg-[#2E4960] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-2xl">&nbsp;Rs. {income}</p>
            <p>Expenses</p>
          </div>
        </div>
      </div>

      <div class="flex ">
        <div class="flex ml-80 ">
          <button
            type="button"
            class="   my-12 border border-gray-700 bg-[#2E4960] text-white rounded-full px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Create Transactions
          </button>
          {openModal && <PostTransaction closeModal={setOpenModal} />}

          <a href="./FinaGetEvents">
            <button class=" my-12 border border-gray-700 bg-[#2E4960] text-white rounded-full px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline ">
              Events
            </button>
          </a>
          <a href="./FinaGetVehicle">
            <button class=" my-12 border border-gray-700 bg-[#2E4960] text-white rounded-full  px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline ">
              Vehicle
            </button>
          </a>
          <a href="./FinaGetStock">
            <button class=" my-12 border border-gray-700 bg-[#2E4960] text-white rounded-full  px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline ">
              Stocks
            </button>
          </a>
        </div>

        <form class="flex items-center ">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-5/6 ml-40">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
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
              placeholder="Search by Transaction Title"
              value={searchTerm}
              onChange={handleSearch}
              class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </form>
      </div>

      {isError !== "" && <h2>{isError}</h2>}

      <div className="text-left ml-72 grid grid-cols-3 gap-0 ">
        {filteredPayData.map((data) => {
          // {transData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).reverse().map((data) => {
          const {
            _id,
            tran_title,
            tran_type,
            tran_target,
            tran_amount,
            tran_date,
            tran_time,
            tran_status,
          } = data;

          const notify = () =>
            toast.success("Transaction Updated ", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });

          return (
            <div
              class=" place-items-stretch text-sm font-medium text-gray-600 dark:text-gray-300 p-4 mt-2 border-solid border-2 mr-1 bg-[#263a4b] mb-3 ml-2 rounded-md"
              key={_id}
            >
              <h2
                title="Transaction Title"
                class=" text-xl bg-blend-color-burn"
              >
                {" "}
                {tran_title}
              </h2>
              <hr class="mt-4 mb-4"></hr>
              <p>Transaction Type : {tran_type}</p>
              <p>Transaction Target : {tran_target}</p>
              <p> Amount : {tran_amount}</p>
              <p> Date : {tran_date}</p>
              <p> Time : {tran_time}</p>
              <p> Status : {tran_status}</p>
              <br />
              <div class="float-left ">
                <button
                  class="border border-red-500 bg-red-500 text-white rounded-full px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => deleteTransaction(_id)}
                >
                  {" "}
                  Delete{" "}
                </button>
                <button
                  class="border-green-500 bg-green-500 text-white rounded-full px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                  onClick={() => {
                    setSelectedData(data);
                    setShowUpdateForm(true);
                  }}
                >
                  {" "}
                  Update
                </button>
              </div>

              <div>
                {showUpdateForm && (
                  <div className="z-50 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                    <form
                      className="w-3/6 font-medium text-gray-400 dark:text-gray-400 p-4 mt-2 border-solid border-2 mr-1 bg-gray-100 dark:bg-gray-800 border-sky-500 mb-3 ml-48 rounded-md "
                      onSubmit={(e) => {
                        e.preventDefault();

                        const data = {
                          // _id: e.target.id.value,
                          tran_title: e.target.title.value,
                          tran_type: e.target.type.value,
                          tran_target: e.target.target.value,
                          tran_amount: e.target.amount.value,
                          tran_date: e.target.date.value,
                          tran_time: e.target.time.value,
                          tran_status: e.target.status.value,
                        };

                        updateTransaction(selectedData._id, data);
                      }}
                    >
                      <div key={selectedData?._id}>
                        <div>
                          <h2 className="text-4xl my-14 flex justify-center">
                            Update Transaction Form
                          </h2>
                        </div>
                        <div class="mb-3 justify-center -mx-2 flex items-start">
                          <label class="font-medium text-sm mb-2 ml-1">
                            {" "}
                            Transaction Title{" "}
                            <input
                              type="text"
                              name="title"
                              defaultValue={selectedData.tran_title}
                              class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                            />{" "}
                          </label>{" "}
                          <label class="font-medium text-sm mb-2 ml-1">
                            {" "}
                            Transaction Type{" "}
                            <select
                              name="type"
                              defaultValue={selectedData.tran_type}
                              class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                              id="tran_type"
                            >
                              <option value="INCOME">INCOME</option>
                              <option value="EXPENSE">EXPENSE</option>
                            </select>{" "}
                          </label>{" "}
                          <br />
                        </div>

                        <div class="mb-3 justify-center -mx-2 flex items-start ">
                          <label class="font-medium text-sm mb-2 ml-1">
                            {" "}
                            Transaction Amount <br />
                            <input
                              type="number"
                              name="amount"
                              defaultValue={selectedData.tran_amount}
                              class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                            />{" "}
                          </label>{" "}
                          <br />
                        </div>

                        <div className=" mb-3 justify-center -mx-2 flex items-end ">
                          <label class="font-medium text-sm mb-2 ml-1">
                            {" "}
                            Transaction Date{" "}
                            <input
                              type="date"
                              name="date"
                              defaultValue={selectedData.tran_date}
                              class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                            />{" "}
                          </label>{" "}
                          <br />
                          <label class="font-medium text-sm mb-2 ml-1">
                            {" "}
                            Transaction Time{" "}
                            <input
                              type="time"
                              name="time"
                              defaultValue={selectedData.tran_time}
                              class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                            />{" "}
                          </label>{" "}
                          <br />
                        </div>

                        <div className=" mb-3 justify-center -mx-2 flex items-end ">
                          <label class="font-medium text-sm mb-2 ml-1">
                            {" "}
                            Transaction Status{" "}
                            <input
                              type="text"
                              readOnly="readOnly"
                              name="status"
                              defaultValue={selectedData.tran_status}
                              className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                            />{" "}
                          </label>{" "}
                          <br />
                          <label class="font-medium text-sm mb-2 ml-1">
                            {" "}
                            Transaction Target{" "}
                            <select
                              name="target"
                              defaultValue={selectedData.tran_target}
                              className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                            >
                              {/* <option value="Health Service Management">Health Service Management</option> */}
                              {/* <option value="Stock Management">Stock Management</option> */}
                              <option value="Event Management">
                                Event Management
                              </option>
                              <option value="Vehicle Management">
                                Vehicle Management
                              </option>
                              <option value="Supplier Management">
                                Supplier Management
                              </option>
                            </select>{" "}
                          </label>{" "}
                          <br />
                        </div>
                        <div class="float-right">
                          <button
                            type="submit"
                            class=" border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                            onClick={notify}
                          >
                            Update Data
                          </button>
                          <button
                            onClick={() => setShowUpdateForm(false)}
                            class="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                          >
                            {" "}
                            CLOSE
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              <br />
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GetTransaction;
