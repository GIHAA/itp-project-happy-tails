import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bgimg from "../assets/bgimg.jpg"
import axios from 'axios'
import VSideBar from "./VSideBar";

function EditVehicle() {

    const param =  useParams();
    const id = param.id
    console.log(id)

    const [vehicle, setVehicle] = useState({});
    const [plateNo, setPlateNo] = useState("");
    const [vModel, setVModel] = useState("");
    const [insuranceExpirationDate, setInsuranceExpirationDate] = useState("");
    const [status, setStatus] = useState("");

  

    async function getVehicle() {
      try {
        const res = await axios.get(`http://localhost:8080/api/vehicle/${id}`);
        const oneVehicle = res.data.vehicle;
        console.log(oneVehicle);
        setVehicle(oneVehicle)

      } catch (err) {
        console.error(err);
      }
    }

  useEffect(()=>{

      getVehicle()
   

  },[])


  useEffect(() => { 
    
    setPlateNo(vehicle.plateNo);
    setVModel(vehicle.vModel);
    setInsuranceExpirationDate(vehicle.insuranceExpirationDate);
    setStatus(vehicle.status);



  },[vehicle])




  async function UpdateVehicle(e){
    console.log("clicked")

    e.preventDefault();

    try{
      const newVehicle = {

      plateNo,
      vModel,
      insuranceExpirationDate,
      status

    }

      await axios.put(`http://localhost:8080/api/vehicle/${id}`, newVehicle)
      alert("Vehicle info Updated !!")

    }catch (err){
      console.error(err);
  }

}


  return (
    //Main container
     <div className="flex scroll-smooth">
         <VSideBar />

     {/*Right Side container start*/}
     <div className="bg-[#d9d9d9] flex-[85%]">

       {/*Header Part*/}
       <div className="bg-[#2E4960] h-100 w-full">
         <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 h-[70px]">EDIT VEHICLE </h1>

       </div>

       {/*Body Part*/}
       <div 
         style={{ backgroundImage: `url(${bgimg})` }}
         className="bg-cover bg-center h-screen w-full fixed" >

             <div className=" bg-white bg-opacity-90 w-[75%] h-[80%] absolute top-5 left-[80px] overflow-scroll"> 

                 <div className="w-[800px] mx-auto rounded-2xl bg-white mt-8">

                 <h1 
                 className=" text-[#ffffff] bg-[#FF9F00] rounded-t-2xl font-bold text-3xl h-20 mb-4 pt-5 text-center drop-shadow-md"
                 >Edit Vehicle Details</h1>

                     <form className="mx-auto" onSubmit={UpdateVehicle}>
                         <div className=" px-4">

                             <div className="flex mb-6">

                                <div className=" w-[50%]  ">
                                     <label className="">Plate Number :</label>
                                     <input type="text" 
                                     className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#a6b0c4] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]" 
                                     value={plateNo}
                                     readOnly/>                        
                                </div>

                              </div>


                              <div className="flex mb-6">

                                  <div className=" w-[50%]  ">
                                      <label className="">Vehicle Model :</label>
                                      <input type="text" 
                                      className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]" 
                                      value={vModel}
                                      onChange={(e)=>{
                                          setVModel(e.target.value)}} required />                        
                                  </div>
                             </div>
                            


                            <div className="flex mb-6">
                                 <div className=" w-[50%]  ">
                                     <label className="">Insurance Expiration Date :</label>
                                     <input type="text" 
                                     className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]" 
                                     value={insuranceExpirationDate}
                                     onChange={(e)=>{
                                      setInsuranceExpirationDate(e.target.value)}} required />                        
                                 </div>
                            </div>


                            <div className="flex mb-6">
                                 <div className=" w-[50%]  ">
                                     <label className="">Availability :</label>
                                     <input type="text" 
                                     className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]" 
                                     value={status}
                                     onChange={(e)=>{
                                         setStatus(e.target.value)}} required />                        
                                 </div>
                             </div>
                                 
                        </div>
                            <center>

                             <button type="submit" 
                             className="text-white bg-[#FF9F00] hover:bg-[#2E4960] mb-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-l w-full sm:w-auto px-5 py-2.5 text-center "
                             >Submit</button></center>
                     </form>

                 </div>
                
             </div>
 
       </div>

     </div> {/*Right Side container end*/}
   </div> //Main container end

 )
}

export default EditVehicle;