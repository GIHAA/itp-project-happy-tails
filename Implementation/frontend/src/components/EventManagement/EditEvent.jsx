import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditEvent() {
  const param = useParams();
  const id = param.id;
  console.log(id);

  const [event, setEvent] = useState({});
  const [eventAmount, setEventAmount] = useState({});
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [startTime, setStart] = useState("");
  const [endTime, setEnd] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [eid, setID] = useState("");
  const [amountId, setAmountID] = useState("");
  const [amountOID, setAmountOID] = useState(null);

  const [amountName, setAmountName] = useState("");
  const [amountPrice, setAmountPrice] = useState("");
  const [amountTicket, setAmountTicket] = useState("");
  const [amountIncome, setAmountIncome] = useState("");
  const [amountExpense, setAmountExpense] = useState("");
  const [amountResult, setAmountResult] = useState("");
  const [amountRate, setAmountRate] = useState("");

  useEffect(() => {
    async function getEventData() {
      try {
        const eventRes = await axios.get(
          `http://localhost:8080/api/event/getEvent/${id}`
        );
        const oneEvent = eventRes.data;
        console.log(oneEvent);
        setEvent(oneEvent.even);

        const amountRes = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}api/eventamount/geteamounts`
        );
        const allEventAmounts = amountRes.data.alleamount;
        const amount = allEventAmounts.filter(
          (ea) => ea.eid === oneEvent.even.eid
        )[0];
        console.log(amount);
        setEventAmount(amount);
        const a = amount._id;
        console.log(a);
        setAmountOID(a);
      } catch (err) {
        toast.error(err);
      }
    }

    getEventData();
  }, []);

  console.log(eventAmount.rate);

  useEffect(() => {
    setID(event.eid);
    setName(event.name);
    setDesc(event.description);
    setStart(event.startTime);
    setEnd(event.endTime);
    setDate(event.date);
    setVenue(event.venue);
    setPrice(event.price);
    setStatus(event.status);
    setImage(event.image);
    setSize(event.size);
    // console.log(event.startTime);
  }, [event]);

  useEffect(() => {
    setAmountOID(eventAmount._id);
    setAmountID(eventAmount.eid);
    setAmountName(eventAmount.eventName);
    setAmountPrice(eventAmount.price);
    setAmountTicket(eventAmount.noOfTicket);
    setAmountIncome(eventAmount.totalIncome);
    setAmountExpense(eventAmount.totalExpense);
    setAmountResult(eventAmount.result);
    setAmountRate(eventAmount.rate);
    console.log(eventAmount.eventName);
  }, [eventAmount]);
  console.log(amountRate);

  async function EditEvent(e) {
    try {
      e.preventDefault();
      const newEvent = {
        name,
        description,
        startTime,
        endTime,
        date,
        venue,
        price,
        status,
        image,
        size,
      };
      console.log(eid);
      console.log(name);
      console.log(price);
      console.log(amountTicket);
      console.log(amountIncome);
      console.log(amountExpense);
      console.log(amountResult);
      console.log(amountRate);

      var rat;
      rat = amountRate;
      console.log(rat);
      var ticket;
      ticket = amountTicket;
      console.log(ticket);
      var income;
      income = amountIncome;
      console.log(income);
      var expense;
      expense = amountExpense;
      console.log(expense);

      const newamount = {
        eid: eid,
        eventName: name,
        price: price,
        noOfTicket: ticket,
        totalIncome: income,
        totalExpense: expense,
        result: amountResult,
        rate: rat,
      };

      Promise.all([
        axios.put(`http://localhost:8080/api/event/editEvent/${id}`, newEvent, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }),
        axios.put(
          `http://localhost:8080/api/eventamount/editeamount/${amountOID}`,
          newamount
        ),
      ])
        .then(() => {
          toast.success("Event Updated Successfully");
          setTimeout(() => {
            window.location.href = "/eventdashboard/getEvents";
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error while editing event");
        });
    } catch (error) {
      console.log(error);
      toast.error("Error while editing event");
    }
  }

  function convertTimeFormat(timeString) {
    //console.log(timeString)
    //  const timeString = timeString;
    // console.log(timeString.length)
    //   const length = timeString.length;
    // console.log(timeString.length)
    /* if(length == 8){
        const hour = parseInt(timeString.substring(0, 2));
        const minute = parseInt(timeString.substring(3, 5));
        const amOrPm = timeString.substring(6);
        console.log("${hour}:${minute} ${amOrPm}")
       // return `"${hours}:${minutes} ${modifier}"`;
      }
      else{
        const hour = parseInt(timeString.substring(0, 1));
        const minute = parseInt(timeString.substring(2, 4));
        const amOrPm = timeString.substring(5);
        console.log("${hour}:${minute} ${amOrPm}")
       // return `${hours}:${minutes} ${modifier}`;
      }*/

    /*
      console.log(hour); // output: 7
      console.log(minute); // output: 18
      console.log(amOrPm); // output: "AM"*/

    /*const [hours, minutes, period] = timeString.split(" ");
console.log(hours); // Output: 7
console.log(minutes); // Output: 18
console.log(period); // Output: AM
*/

    // let [time, modifier] = timeString.split('');
    // let [hours, minutes] = time.split(':');
    //  console.log(time)
    //  console.log(modifier)
    /* console.log(hours)
    console.log(minutes)
      if (hours === '12') {
        hours = '00';
      }
    
      if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
      }
    */
    //  return `${hours}:${minutes} ${modifier}`;
    return "hi";
  }

  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }
  return (
    <>
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
              <Link to="/eventdashboard/getEvents" style={{ color: "white" }}>
                Back
              </Link>
            </div>
            <h1 class="block w-full text-center text-white text-2xl font-bold mb-6">
              Edit Event
            </h1>
            <form onSubmit={EditEvent}>
              <div class="flex flex-col mb-4 block">
                <label
                  class="mb-2 text-lg text-white"
                  style={{ marginLeft: "17.5%" }}
                  for="name"
                >
                  Event Name
                </label>
                <input
                  class="border py-2 px-3 text-grey-800 rounded-lg"
                  style={{ width: "65%", alignSelf: "center" }}
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
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

              <div class="flex flex-col mb-4">
                <label
                  className="block text-lg text-white mb-2"
                  style={{ marginLeft: "17.5%" }}
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  className="border py-2 px-3 text-grey-800 rounded-lg w-full"
                  name="status"
                  id="status"
                  style={{ width: "65%", alignSelf: "center" }}
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option selected></option>
                  <option value="Pending">Pending</option>
                  <option value="Available">Available</option>
                  <option value="Finished">Finished</option>
                </select>
              </div>
              <div class="flex flex-col mb-4">
                <label
                  class="mb-2 text-lg text-white"
                  style={{ marginLeft: "17.5%" }}
                  for="startTime"
                >
                  Start Time
                </label>
                <input
                  class="border py-2 px-3 text-grey-800 rounded-lg"
                  style={{ width: "65%", alignSelf: "center" }}
                  type="time"
                  name="startTime"
                  id="startTime"
                  defaultValue={startTime}
                  required
                  onChange={(e) => {
                    // const timeString = e.target.value; // get the time string in the format "HH:MM"
                    // const timeArray = timeString.split(":"); // split the time string into hours and minutes
                    // let hours = parseInt(timeArray[0]); // parse the hours as an integer
                    // let amOrPm = "AM"; // set the default to "AM"
                    // if (hours >= 12) {
                    //   hours = hours - 12; // convert to 12-hour format
                    //   amOrPm = "PM"; // set to "PM"
                    // }
                    // if (hours === 0) {
                    //   hours = 12; // handle the case of midnight (0 hours)
                    // }
                    // const formattedTime = `${hours}:${timeArray[1]} ${amOrPm}`; // create the formatted time string
                    setStart(e.target.value); // set the state to the formatted time string
                  }}
                />
              </div>
              <div class="flex flex-col mb-4">
                <label
                  class="mb-2 text-lg text-white"
                  style={{ marginLeft: "17.5%" }}
                  for="endTime"
                >
                  End Time
                </label>
                <input
                  class="border py-2 px-3 text-grey-800 rounded-lg"
                  style={{ width: "65%", alignSelf: "center" }}
                  type="time"
                  name="endTime"
                  id="endTime"
                  defaultValue={endTime}
                  required
                  onChange={(e) => {
                    // const timeString = e.target.value; // get the time string in the format "HH:MM"
                    // const timeArray = timeString.split(":"); // split the time string into hours and minutes
                    // let hours = parseInt(timeArray[0]); // parse the hours as an integer
                    // let amOrPm = "AM"; // set the default to "AM"
                    // if (hours >= 12) {
                    //   hours = hours - 12; // convert to 12-hour format
                    //   amOrPm = "PM"; // set to "PM"
                    // }
                    // if (hours === 0) {
                    //   hours = 12; // handle the case of midnight (0 hours)
                    // }
                    // const formattedTime = `${hours}:${timeArray[1]} ${amOrPm}`; // create the formatted time string
                    setEnd(e.target.value); // set the state to the formatted time string
                  }}
                />
              </div>
              <div class="flex flex-col mb-4">
                <label
                  class="mb-2 text-lg text-white"
                  style={{ marginLeft: "17.5%" }}
                  for="date"
                >
                  Date
                </label>
                <input
                  class="border py-2 px-3 text-grey-800 rounded-lg"
                  style={{ width: "65%", alignSelf: "center" }}
                  type="date"
                  name="date"
                  id="date"
                  defaultValue={date}
                  required
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
              <div class="flex flex-col mb-4">
                <label
                  class="mb-2 text-lg text-white"
                  style={{ marginLeft: "17.5%" }}
                  for="venue"
                >
                  Venue
                </label>
                <input
                  class="border py-2 px-3 text-grey-800 rounded-lg"
                  style={{ width: "65%", alignSelf: "center" }}
                  type="text"
                  name="venue"
                  id="venue"
                  value={venue}
                  required
                  onChange={(e) => {
                    setVenue(e.target.value);
                  }}
                />
              </div>
              <div class="flex flex-col mb-4">
                <label
                  class="mb-2 text-lg text-white"
                  style={{ marginLeft: "17.5%" }}
                  for="price"
                >
                  Price
                </label>
                <input
                  class="border py-2 px-3 text-grey-800 rounded-lg"
                  style={{ width: "65%", alignSelf: "center" }}
                  type="number"
                  min="0"
                  step="1"
                  name="price"
                  id="price"
                  value={price}
                  required
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />

                <div class="flex flex-col mb-4">
                  <label
                    class="mb-2 text-lg text-white"
                    style={{ marginLeft: "17.5%" }}
                    for="size"
                  >
                    Participant Size
                  </label>
                  <input
                    class="border py-2 px-3 text-grey-800 rounded-lg"
                    style={{ width: "65%", alignSelf: "center" }}
                    type="text"
                    name="size"
                    id="size"
                    value={size}
                    required
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="flex flex-col mb-4">
                <label
                  class="mb-2 text-lg text-white"
                  style={{ marginLeft: "17.5%" }}
                  for="image"
                >
                  Edit Image
                </label>
                <input
                  class="border py-2 px-3 text-grey-800 rounded-lg w-full text-white"
                  type="file"
                  style={{ marginLeft: "17.5%", width: "65%" }}
                  onChange={convertToBase64}
                />
                {image == "" || image == null ? (
                  ""
                ) : (
                  <img
                    width={100}
                    height={100}
                    src={image}
                    style={{ marginLeft: "17.5%", marginTop: "10px" }}
                  />
                )}
              </div>

              <button
                style={{ backgroundColor: "#F2994A" }}
                className="block bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text-lg mx-auto p-2 rounded-lg"
                type="submit"
              >
                Update Event
              </button>
            </form>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
