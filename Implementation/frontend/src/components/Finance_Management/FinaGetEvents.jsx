import React, { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

const FinaGetEvents = () => {
  const [payData, setpayData] = useState([]);
  const [isError, setIsError] = useState("");


  function refreshPage() {
    setTimeout(function () {
      window.location.reload(false);
    }, 2000);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/eventbudget/getBudgets")
      .then((response) => {
        const data = response.data;

        setpayData(data);

        setpayData(data.allbudget);

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


  return (
    <>
      {/* //BALANCE BAR */}

      <div class="flex ml-48 justify-center flex-cols-1 gap-4 mt-24 ">
        <div class="bg-[#2E4960] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div class="text-right">
            <p class="text-2xl"> &nbsp; Rs. {max}</p>
            <p>Expenses</p>
          </div>
        </div>


        {/* <div class="flex ">
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
                </div> */}




      </div>

      {isError !== "" && <h2>{isError}</h2>}

      <div className="mt-4 mb-16 mr-8 rounded-lg">
        <div className="w-full overflow-hidden shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="table-auto rounded-lg ml-80">
              <thead>
                <tr className="text-base font-semibold tracking-wide text-gray-500 uppercase border-b dark:border-gray-900 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-10 py-4">Event Name</th>
                  <th className="px-10 py-4">Description</th>
                  <th className="px-10 py-4">price</th>
                  <th className="px-10 py-4">Status </th>
                  <th className="px-10 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {Array.isArray(payData) &&
                  payData.map((data) => {
                    const {
                      _id,
                      eventName,
                      description,
                      total,
                      status,
                      amountStatus,
                      eid,
                      items,
                    } = data;
      
                    const notify = () =>
                      toast.success('Payment Accepted ', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                      });
      
                    function updateTransaction() {
                      const updatedTransaction = {
                        status: 'Accepted',
                        eventName: eventName,
                        total: total,
                        description: description,
                        eid: eid,
                        items: items,
                        amountStatus: amountStatus,
                      };
      
                      axios
                        .put(
                          `http://localhost:8080/api/eventbudget/editbudget/${_id}`,
                          updatedTransaction
                        )
                        .then((response) => {
                          console.log(_id);
                          console.log(eventName);
                          console.log(total);
                          console.log(response.data);
                          // calculateprice();
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }
      
                    return (
                      <tr
                        key={_id}
                        className="font-semibold bg-gray-50 dark:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-400 text-gray-100 dark:text-gray-900"
                      >
                        <td className="px-10 py-2">
                          <div className="lex items-center px-10 py-3 text-sm">
                            <div>
                              <p className="font-semibold">{eventName}</p>
                            </div>
                          </div>
                        </td>
      
                        <td className="text-center px-10 py-3 text-sm">
                          {description}
                        </td>
                        <td className="text-center px-10 py-3 text-sm">{total}</td>
                        <td className="text-center px-10 py-3 text-sm">{status}</td>
      
                        <td className="px-10 py-4 text-sm">
                          <button
                            className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                            onClick={() => {
                              notify();
                              updateTransaction();
                              refreshPage();
                            }}
                          >
                            Verify
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

export default FinaGetEvents;
