import React, { useState } from "react";
import axios from 'axios';
import SupplierSideBar from "./SupplierSideBar";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import supp from "../assets/supp.jpg"

export default function AddSuppliers() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");

  function addSuppliers(e) {
    e.preventDefault();
    const newSupplier = {
      name,
      phone,
      email,
      address,
      type
    };
    console.log(newSupplier);

    axios.post("http://localhost:8080/api/suppliers/", newSupplier)
    .then(()=>{
      toast.success("supplier added", {position: toast.POSITION.TOP_RIGHT,})

        setName ("")
        setPhone("")
        setEmail("")
        setEmail("")
        setAddress("")
        setType("")
      })
      .catch((err) => {
        alert(`Supplier insert unsuccessful ${err}`);
      });
  }

  return (
    <div className="flex scroll-smooth">
      <SupplierSideBar />
      <div className="bg-[#d9d9d9] flex-[85%]">
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5">ADD SUPPLIERS</h1>
          <div className=" flex p-5"></div>
        </div>
        <div style={{ backgroundImage: `url(${supp})` }} className="bg-cover bg-center h-screen w-full fixed">

          <div className=" bg-white bg-opacity-90 w-[75%] h-[80%] absolute top-5 left-[80px] overflow-scroll">
            
            <div className="w-[800px] mx-auto rounded-2xl bg-white mt-8">
              <h1 className="text-[#ffffff] bg-[#FF9F00] rounded-t-2xl font-bold text-3xl h-20 mb-4 pt-5 text-center drop-shadow-md">Enter Supplier Details</h1>
              <div></div>
              <form className="mx-auto" onSubmit={addSuppliers}>
                <div className="px-4">
                 
                  <div className>
                    <div>
                    
                      <center>
                      <input
                        placeholder="Enter Name"
                        type="text"
                        className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />  </center>
                    </div>
                  </div><br></br>
                
                  <div className>
                    <div>
                      <center>
                      <input
                        placeholder="Enter Phone Number"
                        type="text"
                        className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        onInput={(e) => {
                          const input = e.target.value;
                          const valid = /^[0-9]{10}$/;
                          if (!valid.test(input)) {
                            e.target.setCustomValidity("Please enter a valid  phone number");
                          } else {
                            e.target.setCustomValidity("");
                          }
                        }}

                        required
                      /></center>
                    </div>
                  </div><br></br>

                  <div className>
                    <div>
                      <center>
                      <input
                        placeholder="Enter Email"
                        type="text"
                        className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        onInput={(e) => {
                          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                          const isValidEmail = emailPattern.test(e.target.value);
                          if (!isValidEmail) {
                            e.target.setCustomValidity("Please enter a valid email address");
                          } else {
                            e.target.setCustomValidity("");
                          }
                        }}
                        required
                      /></center>
                    </div>
                  </div><br></br>

                  <div className>
                    <div >
                    <center>
                      <input
                      placeholder="Enter Address"
                        type="text"
                        className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                        required
                      /></center>
                    </div>
                  </div><br></br>

                  <div className>
                  <center>
                    <div className=" w-[50%] ">
                          
                            <select 
                            className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] "
                            onChange={(e)=>{
                            setType(e.target.value)}} >
                                  <option>Select a category</option>
                                  <option value="food">FOOD</option>
                                  <option value="medicine">MEDICINE</option>
                                  <option value="toys">TOYS</option>
                                  <option value="bathroom-essentials">BATHROOM ESSENTIALS</option>
                                  <option value="grooming-equipments">GROOMING EQUIPMENTS</option>
                                  <option value="event-items">EVENT ITEMS</option>
                                  <option value="other">OTHER</option>
                            </select>
                           
                    </div>
                    </center>
                  </div>
                  
              </div><br></br><br></br>

              <div className="flex mt-8 h-10">

                  <button type="reset" className="text-white bg-[#FF9F00] hover:bg-[#2E4960] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-l sm:w-auto px-20 py-5.5 text-center ml-[130px] mb-[10px] mt-[-8px]">
                    <Link to='../manageSuppliers'>Cancel</Link></button>

                  <button type="submit" 
                  className="text-white bg-[#FF9F00] hover:bg-[#2E4960] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-l sm:w-auto px-20 py-5.5 text-center ml-[130px] mb-[10px] mt-[-8px]"
                  >Submit</button>
              </div>

              </form>
            </div>
           </div>
         </div>
      </div> {/*Right Side container end*/}
    </div> //Main container end
    )
}