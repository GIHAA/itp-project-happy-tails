import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import bg from "../assets/Image.png";
import bg2 from "../assets/back2.png";
import { Link } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";

function Home() {
  const { user } = useSelector((state) => state.auth);


  return (
    <>
      <Header />
      <div
        style={{ backgroundImage: `url(${bg})` }}
        name="home"
        className="snap-start bg-cover bg-center h-screen w-full"
      >
        <div className="max-w-[1200px] mx-auto px-8 flex flex-col justify-center h-full">
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

            {user ? (<button className="rounded-full bg-primary text-white group border-2  px-6 py-3 my-2 flex items-center hover:bg-[#E38E00] hover:border-[#E38E00]">
              <Link to="shelterpet" smooth={true} duration={500}>
                BOOK NOW
              </Link>
            </button>):(<><button className="rounded-full bg-primary text-white group border-2  px-6 py-3 my-2 flex items-center hover:bg-[#E38E00] hover:border-[#E38E00]">
              <Link to="register" smooth={true} duration={500}>
                REGISTER NOW
              </Link>
            </button></>)}

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
    </>
  );
}

export default Home;
