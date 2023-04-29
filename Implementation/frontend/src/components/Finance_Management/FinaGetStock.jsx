import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FinaGetVehicle = () => {
<<<<<<< HEAD

    const [payData, setpayData] = useState([]);
    const [isError, setIsError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPayData, setFilteredPayData] = useState([]);


    function refreshPage() {
        setTimeout(function () {
            window.location.reload(false);

        }, 2000);
    }



    useEffect(() => {
        axios
            .get("http://localhost:8080/api/stockBudget")
            .then((response) => {

                console.log(response);
                setpayData(response.data);
                filterPayments(response.data);

            })

            .catch((error) => setIsError(error.message));
    }, []);



    function calculateprice() {
        const income = payData

            .filter(({ status }) => status === "Accepted")
            .reduce((total1, { total }) => total1 + total, 0);

        return income;
    }


    const max = calculateprice();



    function filterPayments(data) {
        const filtered = data.filter((payment) =>
            payment.supplier_name.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPayData(filtered);
    }

    function handleSearch(e) {

        setSearchTerm(e.target.value);
        if (e.target.value === "") {

            setFilteredPayData(payData);

        } else {

            filterPayments(payData);
        }
    }


    console.log(max);

    return (


        <>


            {/* //BALANCE BAR */}

            <div class="flex ml-48 justify-center flex-cols-1 gap-4 mt-20 ">
                <div class="bg-[#2E4960] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                    <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div class="text-right">
                        <p class="text-2xl"> &nbsp; Rs. {max}</p>
                        <p>Expenses</p>
                    </div>
                </div>


                <div class="flex ">
                    <form class="flex items-center mt-10">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-5/6 ml-80">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input type="text" placeholder="Search by Customer name" value={searchTerm} onChange={handleSearch}
                                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                    </form>
                </div>




            </div>





            <div class="mt-4 mb-16 mr-8 rounded-lg">
                <div class="w-full overflow-hidden  shadow-xs">
                    <div class="w-full overflow-x-auto">

                        <table class="table-auto rounded-lg ml-80">

                            <thead>
                                <tr class="text-base font-semibold tracking-wide  text-gray-500 uppercase border-b dark:border-gray-900 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th className="px-10 py-4">Supplier Name</th>
                                    <th className="px-10 py-4">Item Name</th>
                                    <th className="px-10 py-4">Payment</th>
                                    <th className="px-10 py-4">Payment Status</th>
                                    <th className="px-10 py-4">Action</th>
                                </tr>
                            </thead>

                            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">

                                {filteredPayData.map((data) => {
                                    const {

                                        _id, supplier_name, item_name, total, status, description

                                    } = data;


                                    const notify = () => toast.success('Request Accepted ', {
                                        position: "top-right",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: false,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",

                                    });




                                    function updateTransaction() {
                                        const updatedTransaction = {
                                            status: "Accepted",
                                            supplier_name: supplier_name,
                                            item_name: item_name,

                                            total: total,
                                            description: description,
                                        };

                                        axios
                                            .put(`http://localhost:8080/api/stockBudget/${_id}`, updatedTransaction)
                                            .then((response) => {
                                                console.log(_id)
                                                calculateprice();
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                    }

                                    return (






                                        <tr key={_id} class="font-semibold bg-gray-50 dark:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-400 text-gray-100 dark:text-gray-900">
                                            <td class="px-10 py-2">
                                                <div class="flex items-center px-10 py-3 text-sm">
                                                    <div>
                                                        <p class="font-semibold">{supplier_name}</p>

                                                    </div>
                                                </div>
                                            </td>

                                            <td class="text-center px-10 py-3 text-sm">{item_name}</td>

                                            <td class="text-center px-10 py-3 text-sm ">{total}</td>

                                            <td class="text-center px-10 py-3 text-sm">{status}</td>

                                            <td class="text-center px-10 py-3 text-sm">
                                                <button class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100" onClick={() => { notify(); updateTransaction(); }}> Verify  </button>
                                            </td>
                                        </tr>


                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>


        </>

=======
  const [payData, setpayData] = useState([]);
  const [isError, setIsError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPayData, setFilteredPayData] = useState([]);

  function refreshPage() {
    setTimeout(function () {
      window.location.reload(false);
    }, 2000);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/stockBudget")
      .then((response) => {
        console.log(response);
        setpayData(response.data);
        filterPayments(response.data);
      })

      .catch((error) => setIsError(error.message));
  }, []);

  function calculateprice() {
    const income = payData

      .filter(({ status }) => status === "Accepted")
      .reduce((total, { payment }) => total + payment, 0);

    return income;
  }

  const max = calculateprice();

  function filterPayments(data) {
    const filtered = data.filter((payment) =>
      payment.req_title
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
>>>>>>> b11d283dbe1680def8ce497d049077edf29d482f
    );
    setFilteredPayData(filtered);
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredPayData(payData);
    } else {
      filterPayments(payData);
    }
  }

  console.log(searchTerm);

  return (
    <>
      {/* //BALANCE BAR */}

      <div class="flex ml-48 justify-center flex-cols-1 gap-4 mt-20 ">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-2xl"> &nbsp; Rs. {max ? max.toString() : ""}</p>
            <p>Expenses</p>
          </div>
        </div>

        <div class="flex ">
          <form class="flex items-center mt-10">
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-5/6 ml-80">
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
                placeholder="Search by Customer name"
                value={searchTerm}
                onChange={handleSearch}
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </form>
        </div>
      </div>

      {isError !== "" && <h2>{isError}</h2>}

      <div class="mt-4 mb-16 mr-8 rounded-lg">
        <div class="w-full overflow-hidden  shadow-xs">
          <div class="w-full overflow-x-auto">
            <table class="table-auto rounded-lg ml-80">
              <thead>
                <tr class="text-base font-semibold tracking-wide  text-gray-500 uppercase border-b dark:border-gray-900 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-10 py-4">Request Title</th>
                  <th className="px-10 py-4">Payment</th>
                  <th className="px-10 py-4">Date</th>
                  <th className="px-10 py-4">Payment Status</th>
                  <th className="px-10 py-4">Action</th>
                </tr>
              </thead>

              <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {filteredPayData.map((data) => {
                  const { _id, supplier_name, item_name, total, status } = data;

                  const notify = () =>
                    toast.success("Request Accepted ", {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });

                  function updateTransaction() {
                    const updatedTransaction = {
                      status: "Accepted",
                      supplier_name: supplier_name,
                      item_name: item_name,
                      status: status,
                      total: total.toString(),
                    };

                    axios
                      .put(
                        `http://localhost:8080/api/VehReqPayment/${_id}`,
                        updatedTransaction
                      )
                      .then((response) => {
                        console.log(response.data);
                        calculateprice();
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }

                  return (
                    <tr
                      key={_id}
                      class="font-semibold bg-gray-50 dark:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-400 text-gray-100 dark:text-gray-900"
                    >
                      <td class="px-10 py-2">
                        <div class="flex items-center px-10 py-3 text-sm">
                          <div>
                            <p class="font-semibold">{supplier_name}</p>
                          </div>
                        </div>
                      </td>

                      <td class="text-center px-10 py-3 text-sm">
                        {item_name}
                      </td>

                      <td class="text-center px-10 py-3 text-sm ">{total}</td>

                      <td class="text-center px-10 py-3 text-sm">{status}</td>

                      <td class="text-center px-10 py-3 text-sm">
                        <button
                          class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                          onClick={() => {
                            notify();
                            refreshPage();
                            updateTransaction();
                          }}
                        >
                          {" "}
                          Verify{" "}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinaGetVehicle;
