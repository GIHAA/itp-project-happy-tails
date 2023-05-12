import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import bg from "../assets/Image.png";
import bg2 from "../assets/back2.png";
import { Link } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { AiFillHeart } from "react-icons/ai";
import feedbackservices from "../services/api/feedBack";
import { toast } from "react-toastify";

function Home() {
  const { user } = useSelector((state) => state.auth);

  const [showFeedbackModal, setshowFeedbackModal] = useState(false);

  const [FormData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    message: "",
  });

  const { name, email, message } = FormData;

  const onChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const submitFeedback = () => {

    if(!FormData.name){
      toast.error("Please enter the name")
      return
    }
    if(!FormData.email){
      toast.error("Please enter the email")
      return
    }
    if(!FormData.message){
      toast.error("Please enter the feedback")
      return
    }
    feedbackservices.add(FormData);
    toast.success("Thank you for the Feedback")
    setshowFeedbackModal(false)
    setFormData({    name: user ? user.name : "",
    email: user ? user.email : "",
    message: "",})
  };

  return (
    <>
      <Header />
      <div
        style={{ backgroundImage: `url(${bg})` }}
        name="home"
        className="snap-start bg-cover bg-center h-screen w-full"
      >
        <div className="max-w-[1200px] mx-auto px-8 flex flex-col justify-center h-full">
          {user ? ( <div className="fixed right-0 bottom-0 mr-5 mb-5">

<div className="flex">
            <button
                className="rounded-full bg-secondary text-white group border-2 px-3 py-2 flex items-center hover:bg-[#E38E00] hover:border-[#E38E00]"
              >
                <AiFillHeart className="" />
       
              </button>
              <button
                onClick={() => setshowFeedbackModal(true)}
                className="rounded-full bg-primary text-white group border-2 px-3 py-2 flex items-center hover:bg-[#E38E00] hover:border-[#E38E00]"
              >
                {/* <AiFillHeart className="mr-2" /> */}
                Feedback
              </button>
</div>
          </div>):(<> </>)}
         

          <p className="text-2xl font-po pl-2 text-secondary">
            HI {user ? user.name : ""}, Welcome to
          </p>
          <h1 className="text-4xl sm:text-8xl font-bold text-secondary">
            Happy Tails
          </h1>
          <h2 className="font- pt-4 pl-2 text-4xl sm:text-2xl w-[500px] font-bold text-text">
            Trusted care for your furry friends, while you're away!
          </h2>
          <div className="pt-6">
            {user ? (
              <button className="rounded-full bg-primary text-white group border-2  px-6 py-3 my-2 flex items-center hover:bg-[#E38E00] hover:border-[#E38E00]">
                <Link to="shelterpet" smooth={true} duration={500}>
                  BOOK NOW
                </Link>
              </button>
            ) : (
              <>
                <button className="rounded-full bg-primary text-white group border-2  px-6 py-3 my-2 flex items-center hover:bg-[#E38E00] hover:border-[#E38E00]">
                  <Link to="register" smooth={true} duration={500}>
                    REGISTER NOW
                  </Link>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[70px] px-[80px] h-[200px] bg-secondary p-[50px]">
        <div className="">
          <h1 className="text-2xl font-bold text-white text-center my-2">
            Online Booking
          </h1>
          <p className="text-center text-white">
            Happy Tails online booking system allow users to quickly shedule a
            booking for their pets.
          </p>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-white text-center my-2">
            Customer Service
          </h1>
          <p className="text-center text-white">
            Experience exceptional service, tailored just for you.
          </p>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-white text-center my-2">
            Fast Pickup
          </h1>
          <p className="text-center text-white">
            Fast pickup, worry-free pet sitting - because your furry friends
            deserve the best
          </p>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-secondary pl-[40px] pt-[50px] text-[40px]">
        Our services
      </h1>
      <div
        style={{ backgroundImage: `url(${bg2})` }}
        className="snap-start bg-cover bg-center h-screen w-auto"
      ></div>
      <Footer />

      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-[500px]">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Enter message
            </label>
            <input
              id="message"
              name="message"
              value={message}
              onChange={onChange}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 h-10 text-sm w-full"
            />

            <div className="flex">
              <button className="" onClick={() => setshowFeedbackModal(false)}>
                Close
              </button>
              <button className="ml-auto" onClick={() => submitFeedback()}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
