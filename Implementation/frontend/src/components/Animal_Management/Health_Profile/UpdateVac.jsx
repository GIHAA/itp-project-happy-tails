import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateVac() {

    const param = useParams();
    const [name,setName]=useState("")
    const [loading, setLoading] = useState(true);
    const healthState =param.state;
    const [currentHealthStatus, setCurrentHealthStatus] = useState(healthState);
    const [vaccinations, setVaccinations] = useState([]);
    const pid =param.id;
    const index = param.index;
    
    // console.log(index)
    // console.log(healthState+"hi")

   useEffect(() => {
    
        async function fetchData() {
          try {
            const res = await axios.get(`http://localhost:5000/api/health/getreport/${pid}`);
            const reportdata = res.data.petReport;
            console.log(reportdata.vaccinations)
            setVaccinations(reportdata.vaccinations);
            setLoading(false);
            console.log(vaccinations[index].dateGiven)
          } catch (err) {
            console.error(err);
          }
        }
    
        fetchData();

        if (vaccinations.length > 0) {
            console.log(vaccinations[index].name);
          }
      }, []);

 
   const handleSubmit = async (event) => {

            event.preventDefault();
            console.log(currentHealthStatus)

            const newreport = { 
                pid,
                index, 
                currentHealthStatus, 
                vaccinations };

            try {
               
              await axios.put(`http://localhost:5000/api/health/reportupdate/${pid}`, newreport);
              toast.success('Report Updated successfully',{
                autoClose: 1000, // Display for 3 seconds
              });
              setTimeout(() =>    window.location.href = `/petprofile/displayhealth/${pid}`, 2000);
            } catch (error) {
              console.log(error);
              alert('Failed to save report');
              
            }
          };


      

    return (
      <>
      <div className="absolute top-62 left-386 w-[900px] h-936 bg-[#2F333624] rounded-3xl shadow-2xl ml-[29%] mt-[10%]">
      <h1 class="text-center text-3xl mt-5 font-bold">Vaccination Details Updation</h1>
      <form className="flex flex-col gap-4 p-8" onSubmit={handleSubmit}>        
      <div className="flex flex-col">
          <label htmlFor="petId"
            className=" mb-2 w-[89px] h-[20px] left-[526px] top-[268px] font- not-italic font-[700] text-[16px] leading-[29px] text-black "
          >
            Pet ID :
          </label>
          <input type="text" id="petId" name="petId" value={pid}
          className="py-2 px-3 w-[819px] h-[45px] left-[671px] top-[265px]  mt-3 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your pet's ID"/>

          <label htmlFor="status"
            className="mt-2 mb-2 w-[89px] h-[20px] left-[526px] top-[268px] font- not-italic font-[700] text-[16px] leading-[29px] text-black "
          >
            Status:
          </label>

        <select name="currentHealthStatus"  value={currentHealthStatus} onChange={(event) => setCurrentHealthStatus(event.target.value)} id="currentHealthStatus" class=" py-2 px-3 w-[819px] h-[45px] left-[671px] top-[265px]  mt-3 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <option selected >{healthState}</option>
        <option value="Normal">Normal</option>
        <option value="Critical">Critical</option>
      
 
        </select>
        </div>
        

        {loading ? (
  <button>
    Loading...
  </button>
) : (
  <>
<div class="flex flex-row items-center space-x-16">
    <div className="flex flex-col">
        <label htmlFor="name" className="mb-2 font-bold">Vaccine name:</label>
        <input
            id="name"
            type="text"
            value={vaccinations[index].name}
            onChange={(e) => {
                const updatedVaccinations = [...vaccinations];
                updatedVaccinations[index].name = e.target.value;
                setVaccinations(updatedVaccinations);
            }}
            className="p-2 border border-gray-300 w-96 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>
      
    <div className="flex flex-col">
        <label htmlFor="dateGiven" className="mb-2 font-bold">Date Given:</label>
        <input
            id="dateGiven"
            type="date"
            value={vaccinations[index].dateGiven}
            onChange={(e) => {
                const updatedVaccinations = [...vaccinations];
                updatedVaccinations[index].dateGiven = e.target.value;
                setVaccinations(updatedVaccinations);
            }}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>

    <div className="flex flex-col">
        <label htmlFor="expirationDate" className="mb-2 font-bold">Expiration Date:</label>
        <input
            id="expirationDate"
            type="date"
            value={vaccinations[index].expirationDate}
            onChange={(e) => {
                const updatedVaccinations = [...vaccinations];
                updatedVaccinations[index].expirationDate = e.target.value;
                setVaccinations(updatedVaccinations);
            }}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>
</div>

  </>
)}

<button type="submit"
            className="bg-blue-600 rounded-[10px] mt-5 h-10 w-[150px] m-auto hover:bg-blue-700 text-white font-bold py-2 px-4 shadow focus:outline-none focus:shadow-outline"
          
          >
         Update Details
          </button>
        
        </form>
    </div>
    </>

    )}
