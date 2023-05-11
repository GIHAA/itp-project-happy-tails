import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BudgetRequestForm = () => {
  const [eventName, setEventName] = useState("");
  const [items, setItems] = useState([{ product: "", amount: "" }]);

  const [description, setDesc] = useState("");
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("Pending");
  const [event, setEvent] = useState("");
  const [eid, setId] = useState("");
  const [budgetid, setBudgetId] = useState("");

  useEffect(() => {
    async function getbudgets() {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/eventbudget/getBudgets"
        );
        const eids = res.data.allbudget.map((event) => event.budgetid);
        if (!eids.length) {
          setBudgetId("B1");
        } else {
          const lastId = eids[eids.length - 1];
          const nextId = "B" + (parseInt(lastId.slice(1)) + 1);
          setBudgetId(nextId);
        }
      } catch (err) {
        toast.error(err);
      }
    }
    getbudgets();
  }, []);

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleSubtractItem = () => {
    if (items.length > 1) {
      const list = [...items];
      const lastItem = list.pop();
      const amount = parseFloat(lastItem.amount);

      if (amount !== 0) {
        setTotal(total - amount);
      }

      setItems(list);
    } else {
      setTotal(0);
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...items];
    list[index][name] = value;
    setItems(list);
    console.log(value);

    // Calculate total
    const totalAmount = items.reduce(
      (acc, item) => acc + Number(item.amount),
      0
    );
    setTotal(totalAmount);
  };

  const handleAddItem = () => {
    setItems([...items, { product: "", amount: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      eid,
      budgetid,
      eventName,
      items,
      description,
      total,
      status,
    };

    axios
      .post("http://localhost:8080/api/eventbudget/reqBudget", request)
      .then((res) => {
        console.log(res.data);
        toast.success("Budget request sent successfully");

        // Clear form
        setEventName("");
        setItems([{ product: "", amount: "" }]);
        setTotal("");
        setDesc("");

        setTimeout(() => {
          window.location.href = "/eventdashboard/budget";
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Not inserted ${err}`);
      });
  };

  useEffect(() => {
    async function getevents() {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/event/getEvents"
        );
        //  console.log(res.data)
        setEvent(res.data.allevents);

        //console.log(events)
      } catch (err) {
        toast.error(err);
      }
    }

    getevents();
  }, []);

  return (
    <div class="p-4 sm:ml-64" style={{ marginTop: "20px" }}>
      <div
        className="flex justify-center items-center h-full w-full "
        style={{ marginTop: "70px" }}
      >
        <div
          className="w-1/2 bg-white rounded-lg shadow-2xl p-8 m-4"
          style={{ backgroundColor: "#2E4960", alignSelf: "center" }}
        >
          <div class="flex flex-row-reverse space-x-4 space-x-reverse ...">
            <Link to="/eventdashboard/budget" style={{ color: "white" }}>
              Back
            </Link>
          </div>
          <h1 class="block w-full text-center text-white text-2xl font-bold mb-6">
            Request Budget
          </h1>

          <form onSubmit={handleSubmit}>
            <div class="flex flex-col mb-4 block">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                htmlFor="eventName"
              >
                Event ID
              </label>
              <input
                class="border py-2 px-3 text-grey-800 rounded-lg"
                type="text"
                name="eventId"
                id="eventId"
                value={eid}
                disabled // make the input field read-only to prevent editing
                style={{
                  marginLeft: "10px",
                  width: "65%",
                  alignSelf: "center",
                }}
              />
            </div>

            <div class="flex flex-col mb-4 block">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                htmlFor="eventName"
              >
                Event Name
              </label>

              <select
                class="border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                name="eventName"
                id="eventName"
                onChange={(e) => {
                  setEventName(e.target.value);
                  // set the ID of the selected event to the setId state variable
                  const selectedEvent = event.find(
                    (ev) => ev.name === e.target.value
                  );

                  if (selectedEvent) {
                    setId(selectedEvent.eid);
                  }
                }}
              >
                <option value="">Select an existing event</option>
                {event &&
                  event.map((event) => (
                    <option key={event.id} value={event.name}>
                      {event.name}
                    </option>
                  ))}
              </select>
            </div>

            <div class="flex flex-col mb-4">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                for="description"
              >
                Description
              </label>
              <textarea
                className="w-full border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                type="text"
                name="description"
                id="description"
                required
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </div>

            {items.map((item, index) => (
              <div key={index}>
                <div class="flex flex-col mb-4 block">
                  <label
                    class="mb-2 text-lg text-white"
                    style={{ marginLeft: "17.5%" }}
                    htmlFor={`product${index}`}
                  >
                    Product {index + 1}
                  </label>
                  <input
                    class="border py-2 px-3 text-grey-800 rounded-lg"
                    style={{ width: "65%", alignSelf: "center" }}
                    type="text"
                    name="product"
                    id={`product${index}`}
                    value={item.product}
                    onChange={(e) => handleItemChange(index, e)}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div class="flex flex-col mb-4 block">
                  <label
                    class="mb-2 text-lg text-white"
                    style={{ marginLeft: "17.5%" }}
                    htmlFor={`amount${index}`}
                  >
                    Amount {index + 1}
                  </label>
                  <input
                    class="border py-2 px-3 text-grey-800 rounded-lg"
                    style={{ width: "65%", alignSelf: "center" }}
                    type="number"
                    min={0}
                    name="amount"
                    id={`amount${index}`}
                    value={item.amount}
                    onChange={(e) => handleItemChange(index, e)}
                    placeholder="Enter amount needed"
                    required
                    onKeyPress={(e) => {
                      /* to restrict other character and accept only integer*/
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode < 48 || charCode > 57) {
                        e.preventDefault();
                        toast.error("Please enter only 10 numbers");
                      }
                    }}
                  />
                </div>
              </div>
            ))}

            <div
              className="flex mb-4"
              style={{ marginLeft: "17.5%", marginRight: "17.5%" }}
            >
              <div className="w-1/2 pl-2">
                <label
                  className="block text-lg text-white mb-2"
                  htmlFor="total"
                >
                  Total
                </label>
                <input
                  className="border py-2 px-3 text-grey-800 rounded-lg w-full"
                  type="text"
                  name="total"
                  id="total"
                  value={total}
                  disabled
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                style={{ marginRight: "20px" }}
                onClick={handleAddItem}
              >
                Add Item
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                onClick={handleSubtractItem}
              >
                Remove Item
              </button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <button
                className="block bg-green-500 hover:bg-green-700 text-white font-bold uppercase text-lg mx-auto p-2 rounded-lg"
                type="submit"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BudgetRequestForm;
