import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../common/Spinner";
import Header from "../common/Header";
import Footer from "../common/Footer";

export default function AllEvent() {
  const [events, setEvent] = useState([]);
  const [bookings, setBooking] = useState([]);
  const [totalTicket, setTotalNoOfTickets] = useState(0);
  const [size, setSize] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [petType , setpetType] = useState("");

  useEffect(() => {
    async function getevents() {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/event/getEvents"
        );
        console.log(res.data);
        setEvent(res.data.allevents);
        setIsLoading(false);
        //console.log(events)
      } catch (err) {
        toast.error(err);
      }
    }

    getevents();
  }, []);

  useEffect(() => {
    async function getbookings() {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/eventregister/getbooking"
        );
        const allBookings = res.data.allbooking;
        const totalNoOfTickets = allBookings.reduce(
          (acc, booking) => acc + booking.noOfTicket,
          0
        );
        setBooking(allBookings);
        setTotalNoOfTickets(totalNoOfTickets);
      } catch (err) {
        alert(err);
      }
    }

    getbookings();
  }, []);
  const onDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/event/deleteEvent/${id}`)
      .then((res) => {
        toast.success("Event Deleted!!");
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  console.log(totalTicket);
  function filterContent(report, searchTerm) {
    const result = report.filter(
      (r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.eid.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEvent(result);
  }

  const handleTextSearch = (e) => {
    const searchTerm = document.getElementById("search").value
    axios.get("http://localhost:8080/api/event/getEvents").then((res) => {
    
      if (res.data.allevents) {
        filterContent(res.data.allevents, searchTerm);
      }
    });
  };

  const handleEdit = async (eventId, eid) => {
    const res = await axios.get(
      "http://localhost:8080/api/eventregister/getbooking"
    );
    const allBookings = res.data.allbooking;
    console.log(allBookings);
    const filteredBookings = allBookings.filter(
      (booking) => booking.eid === eid
    );
    const totalNoOfTickets = filteredBookings.reduce(
      (acc, booking) => acc + booking.noOfTicket,
      0
    );

    const response = await axios.get(
      "http://localhost:8080/api/event/getEvents"
    );
    const allevents = response.data.allevents;

    const filteredEvent = allevents.filter((event) => event.eid === eid);

    if (
      filteredEvent[0].size !== "unlimited" &&
      filteredEvent[0].size <= totalNoOfTickets
    ) {
      toast.error("Sorry. Not enough tickets available!");
      return;
    } else if (filteredEvent[0].size > totalNoOfTickets) {
      const remaining =
        Number(filteredEvent[0].size) - Number(totalNoOfTickets);
      if (remaining <= 10) {
        toast.warning(
          `Only ${remaining} tickets are available. If you wish you can book it`
        );
        setTimeout(() => {
          window.location.href = `registerevent/${eventId}`;
        }, 5000);
        return; // Add a return statement to exit the function if the error message is displayed
      }
    }

    window.location.href = `registerevent/${eventId}`;
  };



  return (
    <>
      <Header />
      <div className="h-full overflow-y-scrollf bg-bgsec">
        <div className="flex justify-center pt-5">
          
          <div className="flex justify-center pt-5">
          <input
            id="search"
            type="text"
            placeholder="Search for pets... ex: event name, event id"
            className="border-b-[1px] pl-6 w-[400px] h-[40px] font-bold-sm text-text focus:outline-none focus:ring-2 focus:ring-secondary rounded-[50px]"
          />

          <button
            onClick={handleTextSearch}
            className="ml-2 bg-primary w-[90px] rounded-[40px] text-[16px] font-bold text-white"
          >
            Search
          </button>
        </div>
          
          {/* <div className="flex justify-center pt-5">
          <input
            id="search"
            type="text"
            placeholder="Search for pets... ex: dog, cat, pet name etc"
            className="border-b-[1px] pl-6 w-[400px] h-[40px] font-bold-sm text-text focus:outline-none focus:ring-2 focus:ring-secondary rounded-[50px]"
          />
          <select
  value={petType}
  onChange={(e) => setPetType(e.target.value)}
  className="ml-3 border-b-[1px] pl-6 w-[150px] h-[40px] font-bold-sm text-text focus:outline-none focus:ring-1 focus:ring-gray-200 rounded-[50px]"
>
  <option value="">All</option>
  <option value="Dog">Dog</option>
  <option value="Cat">Cat</option>
</select>

          <button
            onClick={handleSearch}
            className="ml-2 bg-primary w-[90px] rounded-[40px] text-[16px] font-bold text-white"
          >
            Search
          </button>
        </div> */}


        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <div className="flex justify-center pt-5">
              <div className=" mx-auto mb-[100px]">
                <h1 className="text-2xl text-center font-bold mb-4">
                  All Events
                </h1>
                {events.length > 0 ? (
                  events.map((event, index) => {
                    const currentDate = new Date();
                    const eventDate = new Date(
                      `${event.date} ${event.startTime}`
                    );
                    // console.log(currentDate)
                    // console.log(eventDate)
                    if (
                      // eventDate >= currentDate &&
                      event.status === "Available"
                    ) {
                      return (
                        <>
                          <div className="grid grid-cols-1 gap-[70px] px-[80px] py-[40px] h-[200px]p-[50px] rounded-[20px]">
                            <div className="grid grid-cols-3 gap-[20px] px-[120px] h-[300px] ">
                              <div className="bg-cover bg-center rounded-[20px] flex justify-center">
                                <img
                                  src={event.image}
                                  className="w-auto h-[350px] rounded-[20px]"
                                />
                              </div>

                              <div className="col-span-2 rounded-[20px] bg-bg p-4">
                                <h1 className="font-bold text-secondary text-[30px] ">
                                  {event.petName}
                                </h1>
                                <h1 className="font-bold text-secondary text-[20px]">
                                  Event Name : {event.name}
                                </h1>
                                <p className="text-text">{event.des}</p>
                                <ul class="list-disc list-inside text-text">
                                  <li>Venue : {event.venue}</li>
                                  <li>Date : {event.date}</li>
                                  <li>
                                    Start Time: {event.startTime} End Time:{" "}
                                    {event.endTime}
                                  </li>

                                  <li>Price : rs: {event.price}</li>
                                  <li>Maximum Participant : {event.size}</li>
                                  <li>Description : {event.description}</li>
                                </ul>
                                <div className="flex mt-4 pt-3">                
                                  <button
                                    style={{ backgroundColor: "#459DE8" }}
                                    className="ml-auto mr-2 rounded-[20px] w-[140px] h-[40px] border-[1px] bg-secondary text-white font-bold-sm "
                                  >
                                    <a href={`feedbackevent/${event._id}`}>
                                      Feedback
                                    </a>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleEdit(event._id, event.eid)
                                    }
                                    className="rounded-[20px] w-[140px] h-[40px] border-[1px] bg-secondary text-white font-bold-sm "
                                  >
                                    Register
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    } else {
                      return null;
                    }
                  })
                ) : (
                  <p style={{ backgroundColor: "#D5ABAF" }}>No events found.</p>
                )}{" "}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
