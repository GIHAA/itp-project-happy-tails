import React, { useEffect, useState } from "react";
import adpotServices from "../../services/api/adoptPet";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { QrReader } from "react-qr-reader";
import axios from "axios";

function Scanner() {
  const [data, setData] = useState("No result");
  const [ booking , setBooking ] = useState([])
  const [showBookingModal , setshowBookingModal] = useState(true)

  const { user } = useSelector((state) => state.auth);


  const display = (text) => {
    console.log(text)
    if (text.startsWith("http://localhost:8080/qr/")) {
      let parts = text.split("/");
      let endpoint = parts[parts.length - 2];
      let someid = parts[parts.length - 1];
      if (endpoint === "event") {
        displayEvent(text);
      } else if (endpoint === "booking") {

    
        displayBooking(text);
      } else {
        console.log("Error: unrecognized endpoint");
      }
    } else {
      console.log("Error: invalid URL");
    }
  };

  const displayBooking = (text) => {
    axios
      .get(text)
      .then((res) => {
        setBooking(res.data[0]);
        console.log(res.data[0])
        showBookingModal(true)
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  

  const displayEvent =()=>{
    
  }

  return (
    <>
      <Header />

      <div className="w-auto px-[400px] ">
        <div className="p-4 bg-secondary my-6 rounded-[20px]">
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
                setTimeout(() => {
                  display(result?.text)
                },1000);
              }

              if (!!error) {
                // console.info(error);
              }
            }}
            style={{ width: "75%" }}
          />
          <p>{data}</p>
        </div>
      </div>
      <Footer />


      {showBookingModal && (
 <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
 <div className="bg-white rounded-lg p-8">
   <h2 className="text-lg font-bold mb-4">
     Booking ID {booking.bid}
   </h2>
   <table class="border-collapse w-full">
     <tbody>
       <tr class="bg-gray-200">
         <td class="border border-gray-400 px-4 py-2 font-medium">
           Customer name
         </td>
         <td class="border border-gray-400 px-4 py-2">
           {booking.cus_name}
         </td>
       </tr>
       <tr class="bg-gray-100">
         <td class="border border-gray-400 px-4 py-2 font-medium">
           Booking description
         </td>
         <td class="border border-gray-400 px-4 py-2">
           {booking.description}
         </td>
       </tr>
       <tr class="bg-gray-200">
         <td class="border border-gray-400 px-4 py-2 font-medium">
           Number of pets
         </td>
         <td class="border border-gray-400 px-4 py-2">
           {booking.petCount}
         </td>
       </tr>
       <br></br>
     </tbody>
   </table>
   <div className="grid gap-6 mb-6 mt-4 lg:grid-cols-2">
     {/* {booking.mini.map((item, index) => (
       <>
         <table class="border-collapse w-full">
           <tbody>
             <tr class="bg-gray-100">
               <td class="border border-gray-400 px-4 py-1 font-medium">
                 Pet num {index + 1} details
               </td>
               <td class="border border-gray-400 px-4 py-1"></td>
             </tr>
             <tr class="bg-gray-200">
               <td class="border border-gray-400 px-4 py-1 font-medium">
                 Pet ID
               </td>
               <td class="border border-gray-400 px-4 py-1">
                 {item.pid}
               </td>
             </tr>
             <tr class="bg-gray-100">
               <td class="border border-gray-400 px-4 py-1 font-medium">
                 Pet Type
               </td>
               <td class="border border-gray-400 px-4 py-1">
                 {item.type}
               </td>
             </tr>
             <tr class="bg-gray-200">
               <td class="border border-gray-400 px-4 py-1 font-medium">
                 Pet name
               </td>
               <td class="border border-gray-400 px-4 py-1">
                 {item.name}
               </td>
             </tr>
             <tr class="bg-gray-100">
               <td class="border border-gray-400 px-4 py-1 font-medium">
                 Pet Description
               </td>
               <td class="border border-gray-400 px-4 py-1">
                 {item.description}
               </td>
             </tr>
           </tbody>
         </table>
       </>
     ))} */}
   </div>
   <div className="flex justify-end">
     <button
       className="bg-secondary text-white h-[35px] w-[70px] rounded-full"
       onClick={() => setshowBookingModal(false)}
     >
       Close
     </button>
   </div>
 </div>
</div>
      )}
    </>
  );
}

export default Scanner;
