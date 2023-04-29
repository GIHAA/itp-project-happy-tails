import React, { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

const GetBooking = () => {
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
      .get("http://localhost:8080/api/booking")
      .then((response) => {
        const data = response.data;
        console.log(response);
        setpayData(data);
        const petCounts = data.map((item) => item.mini.length);
        const totalPetCount = petCounts.reduce((a, b) => a + b, 0);
        setPetCount(totalPetCount);
        setPetCountsByIndex(petCounts);
      })
      .catch((error) => setIsError(error.message));
  }, []);

  function calculateprice() {
    const income = payData

      .filter(({ status }) => status === "FINISHED")
      .reduce((total, { price }) => total + price, 0);

    return income;
  }

  function calculateBooked() {
    const countBooked = payData.reduce((total, { status, mini }) => {
      if (status === "BOOKED") {
        return total + mini.length;
      }
      return total;
    }, 0);
    return countBooked;
  }

  function calculateShel() {
    const countShel = payData.reduce((total, { status, mini }) => {
      if (status === "SHELTERED") {
        return total + mini.length;
      }
      return total;
    }, 0);
    return countShel;
  }

  const max = calculateBooked();
  const countShel = calculateShel();

  return (
    <>
      {/* //BALANCE BAR */}

      <div class="flex ml-52 justify-center flex-cols-1 gap-4 mt-28 mb-8 ">
        <div class="bg-[#2E4960] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div class="text-right">
            <p class="text-lg"> Total number of pets &nbsp; {petCount}</p>
            <p></p>
          </div>
        </div>

        <div class="bg-[#2E4960] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div class="text-right">
            <p class="text-lg"> Booked pets count &nbsp; {max}</p>
            <p></p>
          </div>
        </div>

        <div class="bg-[#2E4960] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div class="text-right">
            <p class="text-lg"> Sheltered pets count &nbsp; {countShel}</p>
            <p></p>
          </div>
        </div>

        {/* <p>Total number of pets: {petCount}</p> */}
        {/* {petCountsByIndex.map((count, index) => (

          <p key={index}>Index {index}: {count} pets</p>


        ))} */}
      </div>

      {isError !== "" && <h2>{isError}</h2>}

      <div class="mt-4 mb-16 mr-8 rounded-full">
        <div class="w-full overflow-hidden  shadow-xs">
          <div class="w-full overflow-x-auto">
            <table class="table-auto rounded-md ml-72">
              <thead>
                <tr class="text-base font-semibold tracking-wide  text-gray-500 uppercase border-b dark:border-gray-900 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-10 py-4">Customer Name</th>
                  <th className="px-10 py-4">Booking ID </th>
                  <th className="px-10 py-4">Status </th>
                  <th className="px-10 py-4">Pet Count</th>
                  <th className="px-10 py-4">Pet Id's</th>
                  <th className="px-10 py-4">Action</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {payData.map((data) => {
                  const {
                    _id,
                    cus_name,
                    bid,
                    contactNumbers,
                    description,
                    petCount,
                    status,
                    mini,
                  } = data;

                  const notify = () =>
                    toast.success("Booking Verified ", {
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
                      id: _id,
                      status: "SHELTERED",
                      cus_name: cus_name,
                      bid: bid,
                      contactNumbers: contactNumbers,
                      description: description,
                    };

                    axios
                      .put(
                        `http://localhost:8080/api/booking/`,
                        updatedTransaction
                      )
                      .then((response) => {
                        console.log(_id);
                        console.log(cus_name);
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
                        <div class="text-center items-center px-10 py-3 text-sm">
                          <div>
                            <p class="font-semibold">{cus_name}</p>
                          </div>
                        </div>
                      </td>

                      <td class="text-center px-10 py-3 text-sm">{bid}</td>
                      <td class="text-center px-10 py-3 text-sm">{status}</td>

                      <td class=" text-center px-10 py-3 text-sm">
                        {petCount}
                      </td>
                      <td class="text-center px-10 py-3 text-sm">
                        {data.mini.map((miniitem) => (
                          <>
                            <p>{miniitem.pid}</p>
                          </>
                        ))}
                      </td>

                      <td class="px-10 py-4 text-sm">
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

export default GetBooking;
