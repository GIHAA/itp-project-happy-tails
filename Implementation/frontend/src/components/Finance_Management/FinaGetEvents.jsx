import React, { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

const FinaGetEvents = () => {
  const [payData, setpayData] = useState([]);
  const [isError, setIsError] = useState("");
  const [petCount, setPetCount] = useState(0);
  const [petCountsByIndex, setPetCountsByIndex] = useState([]);

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
        console.log(response);
        setpayData(data);
        console.log(data.allbudget);
        setpayData(data.allbudget);
        // const petCounts = data.map(item => item.mini.length);
        // const totalPetCount = petCounts.reduce((a, b) => a + b, 0);
        // setPetCount(totalPetCount);
        // setPetCountsByIndex(petCounts);
      })
      .catch((error) => setIsError(error.message));
  }, []);

  // function calculateprice() {
  //   const income = payData

  //     .filter(({ status }) => status === "Pending")
  //     .reduce((total, { price }) => total + price, 0);

  //   return income;
  // }

  // const max = calculateprice();

  return (
    <>
      {/* //BALANCE BAR */}

      <div class="flex ml-48 justify-center flex-cols-1 gap-4 mt-20 ">
        {/* <div class="bg-[#2E4960] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div class="text-right">
            <p class="text-2xl"> &nbsp; Rs. {max}</p>
            <p>Balances</p>
          </div>
        </div> */}
      </div>

      {isError !== "" && <h2>{isError}</h2>}

      <div class="mt-4 mb-16 mr-8 rounded-lg">
        <div class="w-full overflow-hidden  shadow-xs">
          <div class="w-full overflow-x-auto">
            <table class="table-auto rounded-lg ml-80">
              <thead>
                <tr class="text-base font-semibold tracking-wide  text-gray-500 uppercase border-b dark:border-gray-900 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-10 py-4">Customer ID</th>
                  <th className="px-10 py-4">Status </th>
                  <th className="px-10 py-4">Pet Count</th>
                  <th className="px-10 py-4">Pet Id's</th>
                  <th className="px-10 py-4">Action</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {Array.isArray(payData) &&
                  payData.map((data) => {
                    const { _id, eventName, description, total, status } = data;

                    const notify = () =>
                      toast.success("Payment Accepted ", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });

                    <div></div>;

                    const count = 0;

                    function updateTransaction() {
                      const updatedTransaction = {
                        status: "Accepted",
                        eventName: eventName,
                        total: total,
                        description: description,
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
                        class="font-semibold bg-gray-50 dark:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-400 text-gray-100 dark:text-gray-900"
                      >
                        <td class="px-10 py-2">
                          <div class="lex items-center px-10 py-3 text-sm">
                            <div>
                              <p class="font-semibold">{eventName}</p>
                            </div>
                          </div>
                        </td>

                        <td class="text-center px-10 py-3 text-sm">
                          {description}
                        </td>
                        <td class="text-center px-10 py-3 text-sm">{total}</td>
                        <td class="text-center px-10 py-3 text-sm">{status}</td>

                        {/* <td class="text-center px-10 py-3 text-sm">

                        {data.mini.map((miniitem) => (<><p>{miniitem.pid}</p></>))}
                      </td> */}

                        <td class="px-10 py-4 text-sm">
                          <button
                            class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                            onClick={() => {
                              notify();
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

export default FinaGetEvents;
