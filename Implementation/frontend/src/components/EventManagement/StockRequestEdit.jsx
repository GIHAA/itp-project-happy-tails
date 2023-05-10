import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StockRequestEdit() {
  const param = useParams();
  const id = param.id;
  //console.log(id)

  const [stock, setStock] = useState({});
  const [eventName, setEventName] = useState("");
  const [items, setItems] = useState([{ product: "", quantity: "" }]);
  const [status, setStatus] = useState("pending");
  const [description, setDesc] = useState("");
  const [event, setEvent] = useState("");
  const [eid, setId] = useState("");

  async function getstock() {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/eventstock/getstock/${id}`
      );
      const oneStock = res.data;
      // console.log(oneBudget.stockreq.items.length);
      if (oneStock.stockreq) {
        //  setLength(oneStock.stockreq.items.length);
        setStock(oneStock.stockreq);
      }
    } catch (err) {
      toast.error(err);
    }
  }

  useEffect(() => {
    getstock();
  }, []);

  useEffect(() => {
    setEventName(stock.eventName);
    setId(stock.eid);
    //  setItems(budget.items);
    setDesc(stock.description);

    // console.log(event.startTime);
  }, [stock]);

  async function EditStock(e) {
    e.preventDefault();

    try {
      const newStock = {
        eid,
        eventName,
        items,
        description,
        status,
      };

      await axios.put(
        `http://localhost:8080/api/eventstock/editstock/${id}`,
        newStock
      );
      toast.success("Requested stock Updated Successfully");
      setTimeout(() => {
        window.location.href = "/eventdashboard/stock";
      }, 5000);
    } catch (err) {
      toast.error(err);
    }
  }

  const handleSubtractItem = () => {
    if (items.length > 1) {
      const list = [...items];
      const lastItem = list.pop();
      const quantity = parseFloat(lastItem.quantity);

      setItems(list);
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...items];
    list[index][name] = value;
    setItems(list);
    console.log(value);
  };

  const handleAddItem = () => {
    setItems([...items, { product: "", quantity: "" }]);
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
            <Link to="/eventdashboard/stock" style={{ color: "white" }}>
              Back
            </Link>
          </div>
          <h1 class="block w-full text-center text-white text-2xl font-bold mb-6">
            Edit Stock Request
          </h1>

          <form onSubmit={EditStock}>
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
                value={eventName}
                onChange={(e) => {
                  setEventName(e.target.value);
                  // set the ID of the selected event to the setId state variable
                  const selectedEvent = event.find(
                    (ev) => ev.name === e.target.value
                  );
                  //  console.log(selectedEvent)
                  if (selectedEvent) {
                    setId(selectedEvent.eid);
                  }
                }}
              >
                <option value="">Select an existing event</option>
                {event &&
                  event.map((event) => (
                    <option key={event.id} value={event.id}>
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
                value={description}
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
                    htmlFor={`quantity${index}`}
                  >
                    Quantity {index + 1}
                  </label>
                  <input
                    class="border py-2 px-3 text-grey-800 rounded-lg"
                    style={{ width: "65%", alignSelf: "center" }}
                    type="number"
                    min={0}
                    name="quantity"
                    id={`quantity${index}`}
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    placeholder="Enter quantity needed"
                    required
                    onKeyPress={(e) => {
                      /* to restrict other character and accept only integer*/
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode < 48 || charCode > 57) {
                        e.preventDefault();
                        console.log("Please enter only numbers");
                      }
                    }}
                  />
                </div>
              </div>
            ))}

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
                className="block bg-blue-500 hover:bg-blue-700 text-white font-bold uppercase text-lg mx-auto p-2 rounded-lg"
                type="submit"
              >
                Edit Stock
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
