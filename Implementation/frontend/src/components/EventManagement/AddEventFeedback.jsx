import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../common/Spinner";
import Header from "../common/Header";
import Footer from "../common/Footer";

function AddEventFeedback() {
  const param = useParams();
  const id = param.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [feedbackType, setFType] = useState("");
  const [priceStatisfy, setPstat] = useState("");
  const [funStatisfy, setFstat] = useState("");
  const [description, setDesc] = useState("");
  const [rating, setRate] = useState("");
  const [newIdea, setIdea] = useState("");
  const [eventName, setEventname] = useState("");
  const [eid, setEventId] = useState("");
  const [feedbackid, setFeedId] = useState("");

  useEffect(() => {
    async function getevent() {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/event/getEvent/${id}`
        );
        //console.log(res.data.even.name)
        setEventname(res.data.even.name);
        setEventId(res.data.even.eid);
      } catch (err) {
        toast.error(err);
      }
    }

    getevent();
  }, []);

  useEffect(() => {
    async function getfeedbacks() {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/eventfeedback/getEFeedbacks"
        );
        const eids = res.data.allfeedbacks.map((event) => event.feedbackid);
        if (!eids.length) {
          setFeedId("F1");
        } else {
          const lastId = eids[eids.length - 1];
          const nextId = "F" + (parseInt(lastId.slice(1)) + 1);
          setFeedId(nextId);
        }
      } catch (err) {
        toast.error(err);
      }
    }
    getfeedbacks();
  }, []);

  function addFeedback(e) {
    e.preventDefault();

    const newfeedback = {
      eid,
      feedbackid,
      eventName,
      name,
      email,
      phoneNumber,
      feedbackType,
      priceStatisfy,
      funStatisfy,
      description,
      rating,
      newIdea,
    };

    axios
      .post("http://localhost:8080/api/eventfeedback/addFeedback", newfeedback)
      .then(() => {
        toast.success("Your feedback sent successfully");
        setEventId("");
        setName("");
        setEmail("");
        setPhone(0);
        setFType("");
        setPstat("");
        setFstat("");
        setDesc("");
        setRate("");
        setIdea("");
        setEventname("");

        setTimeout(() => {
          window.location.href = "/events";
        }, 5000);
      })
      .catch((err) => {
        toast.error(`Not inserted ${err}`);
      });
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-full w-full ">
        <div
          className="w-1/2 bg-white rounded-lg shadow-2xl p-8 m-4"
          style={{ backgroundColor: "#2E4960", alignSelf: "center" }}
        >
          <h1 class="block w-full text-center text-white text-2xl font-bold mb-6">
            Feedback Form
          </h1>
          <form onSubmit={addFeedback} method="post">
            <div class="flex flex-col mb-4 block">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                for="cusName"
              >
                Event Name
              </label>
              <input
                class="border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                type="text"
                name="eventName"
                id="eventName"
                value={eventName}
                disabled
              />
            </div>

            <div class="flex flex-col mb-4 block">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                for="name"
              >
                Customer Name
              </label>
              <input
                class="border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                type="text"
                name="name"
                id="name"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onKeyPress={(e) => {
                  /* to restrict other character and accept only integer*/
                  const charCode = e.which ? e.which : e.keyCode;
                  if (
                    (charCode < 65 || charCode > 90) &&
                    (charCode < 97 || charCode > 122)
                  ) {
                    e.preventDefault();
                    toast.error("Name must be in alphabets");
                  }
                }}
              />
            </div>

            <div class="flex flex-col mb-4">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                for="email"
              >
                Email
              </label>
              <input
                class="border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                type="email"
                name="email"
                id="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div class="flex flex-col mb-4">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                for="phoneNumber"
              >
                Phone Number
              </label>
              <input
                class="border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                type="tel"
                maxLength={10}
                minLength={10}
                name="phoneNumber"
                id="phoneNumber"
                required
                onChange={(e) => {
                  if (e.target.value.length !== 10) {
                    e.target.setCustomValidity(
                      "Phone number must be 10 digits"
                    );
                  } else {
                    e.target.setCustomValidity("");
                    setPhone(e.target.value);
                  }
                }}
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

            <div class="flex flex-col mb-4">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                for="feedbackType"
              >
                Feedback Type
              </label>
              <select
                class="border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                name="feedbackType"
                id="feedbackType"
                required
                onChange={(e) => {
                  setFType(e.target.value);
                }}
              >
                <option selected></option>
                <option value="Negative feedback">Negative feedback</option>
                <option value="Positive feedback">Positive feedback</option>
                <option value="Negative feed-forward">
                  Negative feed-forward
                </option>
                <option value="Positive feed-forward">
                  Positive feed-forward
                </option>
              </select>
            </div>

            <div class="flex flex-col mb-4">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                for="priceStatisfy"
              >
                What do you think about the price?{" "}
              </label>
              <select
                class="border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                name="priceStatisfy"
                id="priceStatisfy"
                required
                onChange={(e) => {
                  setPstat(e.target.value);
                }}
              >
                <option selected></option>
                <option value="1">Very dissatisfied</option>
                <option value="2">Dissatisfied</option>
                <option value="3">Neutral</option>
                <option value="4">Satisfied</option>
                <option value="5">Very satisfied</option>
              </select>
            </div>

            <div class="flex flex-col mb-4">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                for="funStatisfy"
              >
                What do you think about the experience or entertainment you got?{" "}
              </label>
              <select
                class="border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                name="funStatisfy"
                id="funStatisfy"
                required
                onChange={(e) => {
                  setFstat(e.target.value);
                }}
              >
                <option selected></option>
                <option value="1">Very dissatisfied</option>
                <option value="2">Dissatisfied</option>
                <option value="3">Neutral</option>
                <option value="4">Satisfied</option>
                <option value="5">Very satisfied</option>
              </select>
            </div>

            <div class="flex flex-col mb-4">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                for="rating"
              >
                What do you think about the overall event?{" "}
              </label>
              <select
                class="border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                name="rating"
                id="rating"
                required
                onChange={(e) => {
                  setRate(e.target.value);
                }}
              >
                <option selected></option>
                <option value="1">Very dissatisfied</option>
                <option value="2">Dissatisfied</option>
                <option value="3">Neutral</option>
                <option value="4">Satisfied</option>
                <option value="5">Very satisfied</option>
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

            <div class="flex flex-col mb-4">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                for="newIdea"
              >
                Do you have any new idea to improve upcoming events?
              </label>
              <textarea
                className="w-full border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                type="text"
                name="newIdea"
                id="newIdea"
                required
                onChange={(e) => {
                  setIdea(e.target.value);
                }}
              />
            </div>

            <button
              style={{ backgroundColor: "#F2994A" }}
              className="block bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text-lg mx-auto p-2 rounded-lg"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AddEventFeedback;
