import React, { useState, useEffect } from "react";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import Chart from "chart.js/auto";

const FinaDashBoard = () => {
<<<<<<< HEAD

    const [isError, setIsError] = useState("");
    const [transData, settransData] = useState([]);
    const [payData, setpayData] = useState([]);
    const [donData, setdonData] = useState([]);
    const [bookData, setbookData] = useState([])

    const [lineChartData, setLineChartData] = useState({});
    const [lineChartData1, setLineChartData1] = useState({});
    const [lineChartData2, setLineChartData2] = useState({});


    const [vehData, setvehData] = useState([]);
    const [stockData, setstockData] = useState([]);
    const [eventData, seteventData] = useState([]);


    // useEffect(() => {

    //     axios
    //         .get("http://localhost:8080/api/cusDonation")

    //         .then((response) => {
    //             console.log(response);
    //             setpayData(response.data);

    //         })

    //         .catch((error) => setIsError(error.message));
    // }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/api/transaction")
            .then((response) => {

                settransData(response.data);
                const prices = response.data.map((item) => item.tran_amount);
                const dt = response.data.map((item2) => item2.tran_date);




                console.log(response);
                const chartData = {
                    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    labels: dt,
                    datasets: [
                        {
                            label: 'Transactions',
                            backgroundColor: '#ffffff',
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 3,
                            hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                            hoverBorderColor: 'rgba(255, 99, 132, 1)',
                            fill: {
                                target: 'origin',
                                above: '#146182',   
                                below: 'rgb(0, 0, 255)'    
                              },
                            tension: 0.001,
                            data: prices
                        }
                    ]
                };

                const ctx = document.getElementById('myChart0');
                const myChart0 = new Chart(ctx, {
                    type: 'line',
                    data: chartData
                });

                setLineChartData2(chartData);
            })
            .catch((error) => setIsError(error.message));
    }, []);


    useEffect(() => {
        axios.get("http://localhost:8080/api/cusDonation")
            .then((response) => {

                setpayData(response.data);
                const prices = response.data.map((item) => item.price);

                const dt = response.data.map((item2) => {
                    const date = new Date(item2.createdAt);
                    return date.toISOString().slice(2, 10);
                });


                console.log(response);
                const chartData = {
                    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    labels: dt,
                    datasets: [
                        {
                            label: 'Total Donations Amount',
                            backgroundColor: '#ffffff',
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 3,
                            hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                            hoverBorderColor: 'rgba(255, 99, 132, 1)',
                            tension: 0.001,
                            data: prices
                        }
                    ]
                };

                const ctx = document.getElementById('myChart1');
                const myChart1 = new Chart(ctx, {
                    type: 'line',
                    data: chartData
                });

                setLineChartData(chartData);
            })
            .catch((error) => setIsError(error.message));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/api/payment")
            .then((response) => {

                const prices = response.data.map((item) => item.payment);

                const dt = response.data.map((item2) => {
                    const date = new Date(item2.createdAt);
                    return date.toISOString().slice(0, 10);
                });

                console.log(response);
                const chartData = {

                    labels: dt,
                    datasets: [
                        {
                            label: 'Payments',
                            backgroundColor: '#ffffff',
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 3,
                            hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                            hoverBorderColor: 'rgba(255, 99, 132, 1)',
                            tension: 0.001,
                            data: prices
                        }
                    ]
                };

                const ctx = document.getElementById('myChart2');
                const myChart2 = new Chart(ctx, {
                    type: 'line',
                    data: chartData

                });

                setLineChartData1(chartData);
            })
            .catch((error) => setIsError(error.message));
    }, []);





    useEffect(() => {

        axios
            .get("http://localhost:8080/api/payment")

            .then((response) => {
                console.log(response);
                setdonData(response.data);
            })

            .catch((error) => setIsError(error.message));
    }, []);



    useEffect(() => {

        axios
            .get("http://localhost:8080/api/booking")

            .then((response) => {
                console.log(response);
                setbookData(response.data);
            })

            .catch((error) => setIsError(error.message));
    }, []);



    useEffect(() => {
        axios
            .get("http://localhost:8080/api/VehReqPayment")
            .then((response) => {
                const filteredData = response.data.filter(
                    (item) => item.status === "Requested"
                );
                setvehData(filteredData);
            })
            .catch((error) => setIsError(error.message));
    }, []);


    useEffect(() => {
        axios
            .get("http://localhost:8080/api/stockBudget")
            .then((response) => {
                const filteredData = response.data.filter(
                    (item) => item.status === "Pending"
                );
                setstockData(filteredData);
            })
            .catch((error) => setIsError(error.message));
    }, []);


    useEffect(() => {
        axios
            .get("http://localhost:8080/api/eventbudget/getBudgets")
            .then((response) => {
                const data = response.data;
                console.log(response);


                const pendingEvents = data.allbudget.filter((event) => event.status === "Pending");

                seteventData(pendingEvents);
            })
            .catch((error) => setIsError(error.message));
    }, []);

    function calDonations() {
        const income = payData

            .filter(({ status }) => status === "Verified")
            .reduce((total, { price }) => total + price, 0);

        return income;
    }



    function calPayments() {
        const income2 = donData

            .filter(({ status }) => status === "Verified")
            .reduce((total, { payment }) => total + payment, 0);

        return income2;
    }
    function calTransactions() {
        const income3 = transData

            .filter(({ tran_status }) => tran_status === "PAID")
            .reduce((total, { tran_amount }) => total + tran_amount, 0);

        return income3;
    }



    // function calBooks() {
    //     const income3 = bookData

    //         .filter(({ status }) => status === "Verified")
    //         .reduce((total, { payment }) => total + payment, 0);

    //     return income3;
    // }


    const donations = calDonations();
    const payments = calPayments();
    const transaction = calTransactions();
    // const books = calbooks();
    const total = donations + payments;



    return (

        <>


            {/* //BALANCE BAR */}
            <div >


                <div class=" flex ml-60 justify-center flex-cols-1 gap-4 mt-10">
                    <div class="bg-[#2E4960] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div class=" flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                            <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out z-[-50]"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl"> &nbsp; Rs. {total}</p>
                            <p>Balance</p>
                        </div>
                    </div>
                    <div class="bg-[#2E4960] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                            <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl"> &nbsp; Rs. {donations}</p>
                            <p>Donations</p>
                        </div>
                    </div>
                    <div class="bg-[#2E4960] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                            <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl"> &nbsp; Rs. {payments}</p>
                            <p>Payments</p>
                        </div>
                    </div>
                    <div class="bg-[#2E4960] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                            <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl"> &nbsp; Rs. {transaction}</p>
                            <p>Transactions</p>
                        </div>
                    </div>



                </div>
            </div>


            <div class="grid gap-10 grid-cols-2 mt-8">

                <div className="ml-80 w-11/12 mx-4 my-4 items-center rounded-md shadow-sm shadow-zinc-500 border-blue-600  bg-[#e9ecec]">

                    {lineChartData && <canvas id="myChart1"></canvas>}
                </div>

                <div class="row-span-3">
                    <div class=" ml-64 mx-4 my-4 items-center ">

                        <table className="table-auto border-collapse w-full shadow-sm shadow-zinc-500 rounded-lg">
                            <thead>
                                <tr>
                                    <th colSpan="4" className="bg-[#2E4960] py-3 px-6 text-center text-white text-base font-bold">
                                        Vehicle Budget Request
                                    </th>
                                </tr>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Request Title</th>
                                    <th className="py-3 px-6 text-center">Payment</th>
                                    <th className="py-3 px-6 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {vehData.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{item.req_title}</td>
                                        <td className="py-3 px-6 text-center">{item.payment}</td>
                                        <td className="py-3 px-6 text-center">{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>


                    <div class="ml-64 mx-4 my-4 items-center ">

                        <table className="table-auto border-collapse w-full shadow-sm shadow-zinc-500 rounded-lg">
                            <thead>
                                <tr>
                                    <th colSpan="4" className="bg-[#2E4960] py-3 px-6 text-center text-white text-base font-bold">
                                        Stock Budget Request
                                    </th>
                                </tr>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Request Title</th>
                                    <th className="py-3 px-6 text-center">Payment</th>
                                    <th className="py-3 px-6 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {stockData.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{item.item_name}</td>
                                        <td className="py-3 px-6 text-center">{item.total}</td>
                                        <td className="py-3 px-6 text-center">{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                     <div class="ml-64 mx-4 my-4 items-center ">

                    <table className="table-auto border-collapse w-full shadow-sm shadow-zinc-500 rounded-lg">
                        <thead>
                            <tr>
                                <th colSpan="4" className="bg-[#2E4960] py-3 px-6 text-center text-white text-base font-bold">
                                    Event Budget Request
                                </th>
                            </tr>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Event Title</th>
                                <th className="py-3 px-6 text-center">Payment</th>
                                <th className="py-3 px-6 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {eventData.map((item) => (
                                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{item.eventName}</td>
                                    <td className="py-3 px-6 text-center">{item.total}</td>
                                    <td className="py-3 px-6 text-center">{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>


                </div>

                <div className=" ml-80 w-11/12 mx-4 my-0 items-center rounded-md shadow-sm shadow-zinc-500  bg-[#e9ecec] ">

                    {lineChartData1 && <canvas id="myChart2"></canvas>}
                </div>





                <div className=" ml-80 w-11/12  mx-4 my-0 items-center rounded-md shadow-sm shadow-zinc-500  bg-[#e9ecec] ">

                    {lineChartData2 && <canvas id="myChart0"></canvas>}
                </div>

               

=======
  const [isError, setIsError] = useState("");
  const [transData, settransData] = useState([]);
  const [payData, setpayData] = useState([]);
  const [donData, setdonData] = useState([]);
  const [bookData, setbookData] = useState([]);

  const [lineChartData, setLineChartData] = useState({});
  const [lineChartData1, setLineChartData1] = useState({});
  const [lineChartData2, setLineChartData2] = useState({});

  // useEffect(() => {

  //     axios
  //         .get("http://localhost:8080/api/cusDonation")

  //         .then((response) => {
  //             console.log(response);
  //             setpayData(response.data);

  //         })

  //         .catch((error) => setIsError(error.message));
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/transaction")
      .then((response) => {
        settransData(response.data);
        const prices = response.data.map((item) => item.tran_amount);
        const dt = response.data.map((item2) => item2.tran_date);

        console.log(response);
        const chartData = {
          // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          labels: dt,
          datasets: [
            {
              label: "Transactions",
              backgroundColor: "#ffffff",
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 3,
              hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
              hoverBorderColor: "rgba(255, 99, 132, 1)",
              tension: 0.001,
              data: prices,
            },
          ],
        };

        const ctx = document.getElementById("myChart0");
        const myChart0 = new Chart(ctx, {
          type: "line",
          data: chartData,
        });

        setLineChartData2(chartData);
      })
      .catch((error) => setIsError(error.message));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/cusDonation")
      .then((response) => {
        setpayData(response.data);
        const prices = response.data.map((item) => item.price);

        const dt = response.data.map((item2) => {
          const date = new Date(item2.createdAt);
          return date.toISOString().slice(0, 10);
        });

        console.log(response);
        const chartData = {
          // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          labels: dt,
          datasets: [
            {
              label: "Total Donations Amount",
              backgroundColor: "#ffffff",
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 3,
              hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
              hoverBorderColor: "rgba(255, 99, 132, 1)",
              tension: 0.001,
              data: prices,
            },
          ],
        };

        const ctx = document.getElementById("myChart1");
        const myChart1 = new Chart(ctx, {
          type: "line",
          data: chartData,
        });

        setLineChartData(chartData);
      })
      .catch((error) => setIsError(error.message));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/payment")
      .then((response) => {
        const prices = response.data.map((item) => item.payment);

        const dt = response.data.map((item2) => {
          const date = new Date(item2.createdAt);
          return date.toISOString().slice(0, 10);
        });

        console.log(response);
        const chartData = {
          labels: dt,
          datasets: [
            {
              label: "Payments",
              backgroundColor: "#ffffff",
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 3,
              hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
              hoverBorderColor: "rgba(255, 99, 132, 1)",
              tension: 0.001,
              data: prices,
            },
          ],
        };

        const ctx = document.getElementById("myChart2");
        const myChart2 = new Chart(ctx, {
          type: "line",
          data: chartData,
        });

        setLineChartData1(chartData);
      })
      .catch((error) => setIsError(error.message));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/payment")

      .then((response) => {
        console.log(response);
        setdonData(response.data);
      })

      .catch((error) => setIsError(error.message));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/booking")

      .then((response) => {
        console.log(response);
        setbookData(response.data);
      })

      .catch((error) => setIsError(error.message));
  }, []);

  function calDonations() {
    const income = payData

      .filter(({ status }) => status === "Verified")
      .reduce((total, { price }) => total + price, 0);

    return income;
  }

  function calPayments() {
    const income2 = donData

      .filter(({ status }) => status === "Verified")
      .reduce((total, { payment }) => total + payment, 0);

    return income2;
  }
  function calTransactions() {
    const income3 = transData

      .filter(({ tran_status }) => tran_status === "PAID")
      .reduce((total, { tran_amount }) => total + tran_amount, 0);

    return income3;
  }

  // function calBooks() {
  //     const income3 = bookData

  //         .filter(({ status }) => status === "Verified")
  //         .reduce((total, { payment }) => total + payment, 0);

  //     return income3;
  // }

  const donations = calDonations();
  const payments = calPayments();
  const transaction = calTransactions();
  // const books = calbooks();
  const total = donations + payments;

  return (
    <>
      {/* //BALANCE BAR */}
      <div>
        <div>
          <h1>Financial Dashboard</h1>
        </div>

        <div class="flex ml-60 justify-center flex-cols-1 gap-4 mt-20 ">
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
              <p class="text-2xl"> &nbsp; Rs. {total}</p>
              <p>Balance</p>
>>>>>>> b11d283dbe1680def8ce497d049077edf29d482f
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="text-right">
              <p class="text-2xl"> &nbsp; Rs. {donations}</p>
              <p>Donations</p>
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="text-right">
              <p class="text-2xl"> &nbsp; Rs. {payments}</p>
              <p>Payments</p>
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="text-right">
              <p class="text-2xl"> &nbsp; Rs. {transaction}</p>
              <p>Transactions</p>
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD





        </>
    )





}


=======
      <div lass=" ml-80 grid justify-items-stretch">
        <div className=" justify-self-auto ml-80 w-5/12 mx-4 my-10 items-center rounded-md shadow-xl shadow-zinc-500 border-blue-600  bg-[#e9ecec]">
          {lineChartData && <canvas id="myChart1"></canvas>}
        </div>
        <div className="justify-self-auto ml-80 w-5/12 mx-4 my-10 items-center rounded-md shadow-xl shadow-zinc-500  bg-[#e9ecec] ">
          {lineChartData1 && <canvas id="myChart2"></canvas>}
        </div>
        <div className="justify-self-auto ml-80  w-5/12  mx-4 my-10 items-center rounded-md shadow-xl shadow-zinc-500  bg-[#e9ecec] ">
          {lineChartData2 && <canvas id="myChart0"></canvas>}
        </div>
      </div>
    </>
  );
};
>>>>>>> b11d283dbe1680def8ce497d049077edf29d482f

export default FinaDashBoard;
