import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventDashboard = () => {
  const [booking, setBooking] = useState([]);
  const [totalin, setTIncome] = useState(0);
  const [length, setLength] = useState(0);
  const [totalIncome, setIncome] = useState("");
  const [totalExpense, setExpense] = useState(0);
  const [eventAmount, setEventAmount] = useState([]);
  const [events, setEvents] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [sum, setSum] = useState(0);
  const [totalbud, setBudTotal] = useState(0);
  const [budget, setBudget] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [stock, setStock] = useState([]);
  const [totalstock, setStockTotal] = useState(0);
  const [event, setEvent] = useState([]);
  const [register, setRegister] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [datas, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [allevent, setAllEvent] = useState([]);
  const [eventstatus, setEventStatus] = useState([]);
  const [pendingEvents, setPendingEvents] = useState(0);
  const [availableEvents, setAvailableEvents] = useState(0);
  const [finishEvents, setFinishEvents] = useState(0);
  const [pendingBudgets, setPendingBudgets] = useState(0);
  const [acceptBudgets, setAcceptBudgets] = useState(0);
  const [rejectBudgets, setRejectBudgets] = useState(0);
  const [filterBudget, setFilterBudget] = useState([]);
  const [filterStock, setFilterStock] = useState([]);
  const [pendingStocks, setPendingStocks] = useState(0);
  const [acceptStocks, setAcceptStocks] = useState(0);
  const [rejectStocks, setRejectStocks] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);

  
  useEffect(() => {
    const getEventAmount = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/eventamount/geteamounts"
        );
        //   console.log(res.data.alleamount);
        setEventAmount(res.data.alleamount);
      } catch (err) {
        toast.error(err);
      }
    };
    const allEvents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/event/getEvents"
        );
        //   console.log(res.data.allevents.length);

        setAllEvent(res.data.allevents);
        console.log(res.data.allevents);
        setEvents(res.data.allevents.length);
      } catch (err) {
        toast.error(err);
      }
    };

    const allfeedbacks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/eventfeedback/getEFeedbacks"
        );
        const feedbacks = res.data.allfeedbacks;
        const ratingByEvent = {};

        // loop through all the feedbacks
        feedbacks.forEach((feedback) => {
          const { eventName, rating } = feedback;

          // check if the event already exists in the ratingByEvent object
          if (eventName in ratingByEvent) {
            ratingByEvent[eventName].totalRating =
              Number(ratingByEvent[eventName].totalRating) + Number(rating);
            // console.log(ratingByEvent[eventName].totalRating)
            ratingByEvent[eventName].numRatings += 1;
            //  console.log(ratingByEvent[eventName].numRatings)
          } else {
            ratingByEvent[eventName] = {
              totalRating: rating,
              numRatings: 1,
            };
          }
        });

        // calculate the average rating for each event
        const eventsWithRating = Object.keys(ratingByEvent).map((eventName) => {
          const { totalRating, numRatings } = ratingByEvent[eventName];
          // console.log(totalRating)
          const averageRating = (totalRating / (numRatings * 5)) * 100;
          return {
            eventName,
            averageRating,
          };
        });

        // console.log(eventsWithRating);
        setFeedback(eventsWithRating);
      } catch (err) {
        toast.error(err);
      }
    };

    const getStock = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/eventstock/getStocks"
        );
        //   console.log(res.data.alleamount);
        setStock(res.data.getstocks);

        // const total = res.data.getstocks.map((stock) => parseInt(stock.total));
        // const sum = total.reduce(
        //   (accumulator, currentValue) => accumulator + currentValue,
        //   0
        // );
        setSum(sum);
      } catch (err) {
        toast.error(err);
      }
    };

    getEventAmount();
    allEvents();
    getStock();
    allfeedbacks();
  }, []);

  useEffect(() => {
    const eventStatusData = allevent.map((event) => {
      let pendingCount = 0;
      let availableCount = 0;
      let finishCount = 0;

      if (event.status === "Finished") {
        finishCount += 1;
        //     console.log(finishCount)
      }
      if (event.status === "Pending") {
        pendingCount += 1;
      }
      if (event.status === "Available") {
        availableCount += 1;
      }

      return [pendingCount, availableCount, finishCount];
    });

    // Then, you can calculate the total counts by summing up the individual counts
    const [pendingCount, availableCount, finishCount] = eventStatusData.reduce(
      (
        [pending, available, finished],
        [pendingCount, availableCount, finishCount]
      ) => [
        pending + pendingCount,
        available + availableCount,
        finished + finishCount,
      ],
      [0, 0, 0]
    );

    // Finally, set the state variables for the counts
    setPendingEvents(pendingCount);
    setAvailableEvents(availableCount);
    setFinishEvents(finishCount);
  }, [allevent]);

  const eventStatus = [
    {
      name: "Total Pending Event",
      value: pendingEvents,
    },
    {
      name: "Total Available Event",
      value: availableEvents,
    },
    {
      name: "Total Finished Event",
      value: finishEvents,
    },
  ];

  useEffect(() => {
    const allbookings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/eventregister/getbooking"
        );
        setBooking(res.data.allbooking);
        setLength(res.data.allbooking.length);

        const total = res.data.allbooking.map((book) => parseInt(book.total));
        const sum = total.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        setSum(sum);
        console.log(sum);
      } catch (err) {
        toast.error(err);
      }
    };
    allbookings();
  }, []);

  useEffect(() => {
    const allbudgets = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/eventbudget/getBudgets"
        );
        setBudget(res.data.allbudget);
        console.log(res.data.allbudget);

        const allBudget = res.data.allbudget.filter(
          (bud) => bud.status === "Accepted"
        );
        setFilterBudget(allBudget);

        const total = allBudget.map((bud) => parseInt(bud.total));
        const totalbud = total.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        setBudTotal(totalbud);
        console.log(totalbud);
      } catch (err) {
        toast.error(err);
      }
    };
    allbudgets();
  }, []);

  useEffect(() => {
    const allstocks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/eventstock/getStocks"
        );
        setStocks(res.data.getstocks);
        console.log(res.data.getstocks);

        const allstock = res.data.getstocks.filter(
          (stock) => stock.status === "Accepted"
        );
        setFilterStock(allstock);

        const total = allstock.map((stock) => parseInt(stock.total));
        const totalstock = total.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        setStockTotal(totalstock);
        console.log(totalstock);
      } catch (err) {
        toast.error(err);
      }
    };
    allstocks();
  }, []);

  useEffect(() => {
    const budgetStatusData = budget.map((bud) => {
      let pendingCount = 0;
      let acceptCount = 0;
      let rejectCount = 0;

      if (bud.status === "Pending") {
        pendingCount += 1;
      }
      if (bud.status === "Accepted") {
        acceptCount += 1;
      }
      if (bud.status === "Rejected") {
        rejectCount += 1;
      }

      return [pendingCount, acceptCount, rejectCount];
    });

    // Then, you can calculate the total counts by summing up the individual counts
    const [pendingCount, acceptCount, rejectCount] = budgetStatusData.reduce(
      (
        [pending, accepted, rejected],
        [pendingCount, acceptCount, rejectCount]
      ) => [
        pending + pendingCount,
        accepted + acceptCount,
        rejected + rejectCount,
      ],
      [0, 0, 0]
    );

    // Finally, set the state variables for the counts
    setPendingBudgets(pendingCount);
    setAcceptBudgets(acceptCount);
    setRejectBudgets(rejectCount);
  }, [budget]);

  const budgetStatus = [
    {
      name: "Pending Request",
      value: pendingBudgets,
    },
    {
      name: "Accepted Request",
      value: acceptBudgets,
    },
    {
      name: "Rejected Request",
      value: rejectBudgets,
    },
  ];

  console.log(stock);
  useEffect(() => {
    const stockStatusData = stock.map((stock) => {
      let pendingCount = 0;
      let acceptCount = 0;
      let rejectCount = 0;

      if (stock.status === "Pending") {
        pendingCount += 1;
      }
      if (stock.status === "Accepted") {
        acceptCount += 1;
      }
      if (stock.status === "Rejected") {
        rejectCount += 1;
      }

      return [pendingCount, acceptCount, rejectCount];
    });

    // Then, you can calculate the total counts by summing up the individual counts
    const [pendingCount, acceptCount, rejectCount] = stockStatusData.reduce(
      (
        [pending, accepted, rejected],
        [pendingCount, acceptCount, rejectCount]
      ) => [
        pending + pendingCount,
        accepted + acceptCount,
        rejected + rejectCount,
      ],
      [0, 0, 0]
    );

    // Finally, set the state variables for the counts
    setPendingStocks(pendingCount);
    setAcceptStocks(acceptCount);
    setRejectStocks(rejectCount);
  }, [stock]);

  const stockStatus = [
    {
      name: "Pending Request",
      value: pendingStocks,
    },
    {
      name: "Accepted Request",
      value: acceptStocks,
    },
    {
      name: "Rejected Request",
      value: rejectStocks,
    },
  ];

  const data = [
    {
      name: "Total Income",
      value: sum,
    },
    {
      name: "Total Expenses",
      value: totalbud,
    },
  ];
  const COLORS = ["#00FF00", "#CC3333"];

  const gradientOffset = () => {
    const dataMax = Math.max(...feedback.map((i) => i.averageRating));
    const dataMin = Math.min(...feedback.map((i) => i.averageRating));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };
  const off = gradientOffset();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/eventregister/getbooking"
        );
        setRegister(response.data.allbooking);

        const response2 = await axios.get(
          "http://localhost:8080/api/eventbudget/getBudgets"
        );
        setBudgets(response2.data.allbudget);

        const response3 = await axios.get(
          "http://localhost:8080/api/event/getEvents"
        );
        setEvent(response3.data.allevents);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (event.length === 0 || register.length === 0 || budgets.length === 0) {
      return;
    }
    const eventsData = event.map((event) => {
      let ticketCount = 0;
      let expense = 0;
      let rate = 0;
      let result = "";

      register.forEach((reg) => {
        if (event.name === reg.eventName) {
          ticketCount += Number(reg.noOfTicket);
        }
      });

      const income = ticketCount * event.price;

      budget.forEach((bud) => {
        if (
          event.name === bud.eventName &&
          event.eid === bud.eid &&
          bud.status === "Accepted" 
        ) {
          expense += Number(bud.total);
        }
      });

      if (expense === 0 || income === 0) {
        result = "Not started";
        rate = 0;
      } else {
        result = ticketCount * event.price > expense ? "Profit" : "Loss";
        rate = ((ticketCount * event.price - expense) / expense) * 100;
      }

      return {
        eventName: event.name,
        rate: rate.toFixed(2),
      };
    });
    setData(eventsData);
  }, [event, register, budgets]);

  useEffect(() => {
    const chartData = datas.map(({ eventName, rate }) => ({
      name: eventName,
      Rate: Number(rate),
    }));
    let total=0
    total =  Number(totalbud)+Number(totalstock)
    setCurrentTotal(total)
    setChartData(chartData);
    console.log(chartData);
  }, [datas]);

  // console.log(chartDatas);

  return (
    <div class="p-4 sm:ml-64">
      <div
        className="flex justify-center items-center h-full "
        style={{ marginTop: "70px" }}
      >
        <div
          className="bg-white rounded-lg shadow-2xl p-8 m-4 w-3/4"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="flex justify-around mt-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-medium">Total Events</h2>
              <p className="text-3xl font-bold">{events}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-medium">Total Bookings</h2>
              <p className="text-3xl font-bold">{length}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-medium">Total Income</h2>
              <p className="text-3xl font-bold">{sum}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-medium">Total Expenses</h2>
              <p className="text-3xl font-bold">{currentTotal}</p>
            </div>
          </div>

          <div className="mt-8 z-70">
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <div style={{ textAlign: "center" }}>
                  <h1
                    style={{
                      textAlign: "left",
                      marginLeft: "200px",
                      fontWeight: "bold",
                    }}
                  >
                    Income - Expense Pie Chart
                  </h1>
                  {eventAmount ? (
                    <PieChart width={600} height={400}>
                      <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        labelLine={false}
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  ) : (
                    <p>Loading data...</p>
                  )}
                </div>
              </div>
              {/* <div style={{ flex: 1, marginLeft: '1rem' }}>
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-1/2 bg-white rounded-lg shadow-2xl p-8 m-4" style={{ backgroundColor: "#2E4960" }}></div>
    </div>
  </div> */}
            </div>
          </div>

          {/* <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> */}
          <div className="mt-8">
            {eventStatus.length > 0 && (
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ textAlign: "center" }}>
                    <h1
                      style={{
                        textAlign: "left",
                        marginLeft: "200px",
                        fontWeight: "bold",
                      }}
                    >
                      Event Status Bar Chart
                    </h1>
                    <div style={{ width: "100%" }}>
                      <BarChart
                        width={500}
                        height={300}
                        data={eventStatus}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                        barSize={20}
                      >
                        <XAxis
                          dataKey="name"
                          scale="point"
                          padding={{ left: 10, right: 10 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar
                          dataKey="value"
                          fill="#8884d8"
                          background={{ fill: "#eee" }}
                        />
                      </BarChart>
                    </div>
                  </div>
                </div>
                {/* <div style={{ flex: 1, marginLeft: '1rem' }}>
      <div className="flex justify-center items-center h-full w-full">
        <div className="w-1/2 bg-white rounded-lg shadow-2xl p-8 m-4" style={{ backgroundColor: "#2E4960" }}>
         
        </div>
      </div>
    </div>  */}
              </div>
            )}
          </div>

          {/* <div style={{ textAlign: 'center'}}>
<h1>Event Rating</h1>
<AreaChart
  width={800}
  height={300}
  data={feedback}
  margin={{
    top: 10,
    right: 30,
    left: 0,
    bottom: 0,
  }}
>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="eventName" />
  <YAxis />
  <Tooltip />
  <defs>
    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
      <stop offset={off} stopColor="green" stopOpacity={1} />
      <stop offset={off} stopColor="red" stopOpacity={1} />
    </linearGradient>
  </defs><Legend/>
  <Area type="monotone" dataKey="averageRating" stroke="#000" fill="url(#splitColor)" />
  
</AreaChart> */}

          <div className="mt-8">
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <div style={{ textAlign: "center" }}>
                  <h1
                    style={{
                      textAlign: "left",
                      marginLeft: "200px",
                      fontWeight: "bold",
                    }}
                  >
                    Budget Request Status Bar Chart
                  </h1>
                  <div style={{ width: "100%" }}>
                    <BarChart
                      width={500}
                      height={300}
                      data={budgetStatus}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      barSize={20}
                    >
                      <XAxis
                        dataKey="name"
                        scale="point"
                        padding={{ left: 10, right: 10 }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Bar
                        dataKey="value"
                        fill="#8884d8"
                        background={{ fill: "#eee" }}
                      />
                    </BarChart>
                  </div>
                </div>
              </div>
              {/* <div style={{ flex: 1 }}>
    <div class="p-4 sm:ml-64">
      <div className="flex justify-center items-center h-full w-full ">
        <div
          className="w-1/2 bg-white rounded-lg shadow-2xl p-8 m-4"
          style={{ backgroundColor: '#2E4960' }}
        ></div>
      </div>
    </div>
  </div> */}
            </div>
          </div>

          <div className="mt-8">
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <div style={{ textAlign: "center" }}>
                  <h1
                    style={{
                      textAlign: "left",
                      marginLeft: "200px",
                      fontWeight: "bold",
                    }}
                  >
                    Stock Request Status Bar Chart
                  </h1>
                  <div style={{ width: "100%" }}>
                    <BarChart
                      width={500}
                      height={300}
                      data={stockStatus}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      barSize={20}
                    >
                      <XAxis
                        dataKey="name"
                        scale="point"
                        padding={{ left: 10, right: 10 }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Bar
                        dataKey="value"
                        fill="#8884d8"
                        background={{ fill: "#eee" }}
                      />
                    </BarChart>
                  </div>
                </div>
              </div>
              {/* <div style={{ flex: 1 }}>
    <div class="p-4 sm:ml-64">
      <div className="flex justify-center items-center h-full w-full ">
        <div className="w-1/2 bg-white rounded-lg shadow-2xl p-8 m-4" style={{ backgroundColor: "#2E4960"}}>
        </div>
      </div>
    </div>
  </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;
