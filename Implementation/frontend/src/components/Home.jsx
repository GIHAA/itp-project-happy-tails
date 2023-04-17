import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import bg from "../assets/Image.png";
import { Link } from "react-router-dom";

function Home() {

  const { user } = useSelector((state) => state.auth);

  const [value, onChange] = useState('10:00');

  const renderPortals = (param) => {
    switch (param) {
      case "ADMIN":
        return <></>;
      case "EVENT_MANAGER":
        return <></>;
      case "SHELTER_MANAGER":
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${bg})` }}
        name="home"
        className="snap-start bg-cover bg-center h-screen w-full"
      >
        <div className="max-w-[1200px] mx-auto px-8 flex flex-col justify-center h-full">
          <p className="text-2xl font-po pl-2 text-secondary">
            HI {user ? user.name :''}, Welcome to
          </p>
          <h1 className="text-4xl sm:text-8xl font-bold text-secondary">
            Happy tails
          </h1>
          <h2 className="font- pt-4 pl-2 text-4xl sm:text-2xl font-bold text-text">
            placeholder
          </h2>
          <div>
            <button className="rounded-lg bg-primary text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-[#E38E00] hover:border-[#E38E00]">
              <Link to="Projects" smooth={true} duration={500}>
                BOOK NOW
              </Link>

            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[70px] px-[80px] h-[200px] bg-secondary p-[50px]">
        <div className="">
          <h1 className="text-2xl font-bold text-white text-center my-2">placeholder</h1>
          <p className="text-center text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-white text-center my-2">placeholder</h1>
          <p className="text-center text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-white text-center my-2">placeholder</h1>
          <p className="text-center text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>

    

      {user ? (
        <>
          {" "}
          <div>
            <pre> user id - {user._id}</pre>{" "}
          </div>
          <div>
            <pre> user name - {user.name}</pre>
          </div>
          <div>
            <pre> user email - {user.email}</pre>
          </div>
          <div>
            <pre> user token - </pre> {user.token}
          </div>
          <div>
            <pre> user role - {user.role}</pre>
          </div>
          <div>
            <pre> user image - {user.image}</pre>
            <img src={`/uploads/${user.image}`} alt="user" />
          </div>
        </>
      ) : (
        <>please login</>
      )}

      {user ? renderPortals(user.role) : <></>}
    </>
  );
}

export default Home;
