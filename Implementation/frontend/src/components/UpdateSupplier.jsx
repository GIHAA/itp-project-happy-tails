import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SupplierSideBar from "./SupplierSideBar";
import { ToastContainer, toast } from "react-toastify";
import supp from "../assets/supp.jpg";
import { useSelector } from "react-redux";

export default function UpdateSupplier() {
  const param = useParams();
  const id = param.id;
  console.log(id);

  const [profile, setProfile] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const { user } = useSelector((state) => state.auth);

  async function getSupplierProfile() {
    try {
      const res = await axios.get(`http://localhost:8080/api/suppliers/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(res);
      const oneProfile = res.data.supplier;
      //console.log(res.data.profile);
      setProfile(oneProfile);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getSupplierProfile();
  }, []);

  useEffect(() => {
    setName(profile.name);
    setPhone(profile.phone);
    setEmail(profile.email);
    setAddress(profile.address);
    setType(profile.type);
  }, [profile]);

  async function UpdateData(e) {
    e.preventDefault();

    const newSupplier = {
      name,
      phone,
      email,
      address,
      type,
    };

    try {
      console.log(newSupplier);
      await axios
        .put(`http://localhost:8080/api/suppliers/${id}`, newSupplier, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          toast.success("supplier details updated", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setTimeout(() => {
            window.location.href = "/ManageSuppliers";
          }, 3000);
        });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex scroll-smooth">
      <SupplierSideBar />
      <div className="bg-[#d9d9d9] flex-[85%]">
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5">
            UPDATE SUPPLIER INFORMATION
          </h1>
          <div className=" flex p-5"></div>
        </div>
        <div
          style={{ backgroundImage: `url(${supp})` }}
          className="bg-cover bg-center h-screen w-full fixed"
        >
          <div className=" bg-white bg-opacity-90 w-[75%] h-[80%] absolute top-5 left-[80px] overflow-scroll">
            <div className="w-[800px] mx-auto rounded-2xl bg-white mt-8">
              <h1 className="text-[#ffffff] bg-[#FF9F00] rounded-t-2xl font-bold text-3xl h-20 mb-4 pt-5 text-center drop-shadow-md">
                Enter New Details
              </h1>
              <form className="mx-auto" onSubmit={UpdateData}>
                <div className="px-4">
                  <div className="flex mb-10">
                    <div className=" w-[50%] ">
                      <label className="">Name :</label>
                      <input
                        type="text"
                        className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label className="">Email :</label>
                      <input
                        type="text"
                        className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        onInput={(e) => {
                          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                          const isValidEmail = emailPattern.test(
                            e.target.value
                          );
                          if (!isValidEmail) {
                            e.target.setCustomValidity(
                              "Please enter a valid email address"
                            );
                          } else {
                            e.target.setCustomValidity("");
                          }
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex mb-10">
                    <div className=" w-[50%] ">
                      <label className="">Type :</label>
                      <select
                        className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] "
                        value={type}
                        onChange={(e) => {
                          setType(e.target.value);
                        }}
                      >
                        <option>Select a category</option>
                        <option value="food">FOOD</option>
                        <option value="medicine">MEDICINE</option>
                        <option value="toys">TOYS</option>
                        <option value="bathroom-essentials">
                          BATHROOM ESSENTIALS
                        </option>
                        <option value="grooming-equipments">
                          GROOMING EQUIPMENTS
                        </option>
                        <option value="event-items">EVENT ITEMS</option>
                        <option value="other">OTHER</option>
                      </select>
                    </div>

                    <div className=" w-[50%] mb-6 ">
                      <label className="">Phone :</label>
                      <input
                        type="text"
                        className="block rounded-3xl py-2.5 px-5 
                        w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 
                        appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] "
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        onInput={(e) => {
                          const input = e.target.value;
                          const valid = /^[0-9]{10}$/;
                          if (!valid.test(input)) {
                            e.target.setCustomValidity(
                              "Please enter a valid  phone number"
                            );
                          } else {
                            e.target.setCustomValidity("");
                          }
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex mb-10">
                    <div className="w-[50%] mb-6">
                      <label className="">Address :</label>
                      <input
                        type="text"
                        className="block rounded-3xl py-2.5 px-5 
                        w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 
                        appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] "
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <center>
                  {" "}
                  <button
                    type="submit"
                    className="text-white bg-[#FF9F00] hover:bg-
                  [#2E4960] mb-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold 
                  rounded-lg text-l w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Submit
                  </button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>{" "}
      {/*Right Side container end*/}
    </div> //Main container end
  );
}
