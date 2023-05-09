import React, { useState, useEffect } from "react";
import axios from "axios";
import SupplierSideBar from "./SupplierSideBar";
import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import supp from "../assets/supp.jpg";
import { useSelector } from "react-redux";

const moment = require('moment');
export default function SupplierList() {
    const [supplierData, setSupplierData] = useState([]);
    const [stockRequestData, setStockRequestData]=useState([]);
    const [stockBudgetRequestData, setStockBudgetRequestData]=useState([]);
    const {user} = useSelector((state)=>state.auth);

  useEffect(() => {
    axios.get("http://localhost:8080/api/suppliers/",{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(response => {
        setSupplierData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(()=>{
  
    axios.get("http://localhost:8080/api/inventory/stockrequest/",{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
        setStockRequestData(res.data)
    })
    .catch(err => alert(err))

}, []) 

useEffect(() => {
    axios
      .get("http://localhost:8080/api/stockBudget/",{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setStockBudgetRequestData(res.data);
      })
      .catch((err) => alert(err));
  }, []);


  const chartData1 = {
    labels: ['food', 'medicine', 'toys','bathroom-essentials','event-items','grooming-equipments','other'],
    datasets: [{
      label: 'Number of Suppliers',
      data: [
        supplierData.filter(supplier => supplier.type === 'food').length,
        supplierData.filter(supplier => supplier.type === 'medicine').length,
        supplierData.filter(supplier => supplier.type === 'toys').length,
        supplierData.filter(supplier => supplier.type === 'bathroom-essentials').length,
        supplierData.filter(supplier => supplier.type === 'grooming-equipments').length,
        supplierData.filter(supplier => supplier.type === 'event-items').length,
        supplierData.filter(supplier => supplier.type === 'other').length,

      ],
      backgroundColor: [
                "#B9EDDD",
                "#F2E3DB",
                "#DDFFBB",
                "#B9E9FC",
                "#F3E8FF",
                "#E5D1FA",
                "#EDDBC7"
      ],
     
      borderWidth: 1
    }]
  };

  const chartData2 = {
    labels: ['accepted', 'pending'],
    datasets: [{
        label: 'Number of accepted or pendig requests',
      data: [
        stockRequestData.filter(stockrequest => stockrequest.status === 'accepted').length,
        stockRequestData.filter(stockrequest => stockrequest.status === 'pending').length,
        
      ],
      backgroundColor: [
                "#B9EDDD",
                "#F2E3DB"
      ],
     
      borderWidth: 1
    }]
  };

  const chartData3 = {
    labels: ['Pending', 'Accepted'],
    datasets: [{
      label: 'Number of accepted or pendig requests',
      data: [
        stockBudgetRequestData.filter(budget => budget.status === 'Pending').length,
        stockBudgetRequestData.filter(budget => budget.status === 'Accepted').length,
      ],
      backgroundColor: [
                "#B9EDDD",
                "#F2E3DB"
      ],
     
      borderWidth: 1
    }]
  };

  

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  
  
return (
    //Main container
     <div className="flex scroll-smooth">
       <SupplierSideBar />


     {/*Right Side container start*/}
     <div className=" flex-[85%]">

       {/*Body Part*/}
       <div 
         style={{ backgroundImage: `url(${supp})` }}
         className="bg-cover bg-center h-screen w-full fixed" >

           <div className=" bg-[#2E4960] flex place-content-around w-[85%]">
                 <h1 className=" text-center text-4xl text-slate-50 p-8">SUPPLIER MANAGEMENT DASHBOARD</h1>
           </div >

             {/*White box*/}
             <div 
             id="canvas"
             className=" bg-[#f3f3f3] w-[85%] h-[100%] absolute overflow-scroll">
             

               <div className="mt-4 ml-4">

               <div className=" flex place-content-around h-[350px] mt-5">
               {(
                     <div className=" w-6/12 h-full bg-white p-20 shadow-lg rounded-xl">
                         <b><h2>Supplier Types of Happy Tails</h2></b><br></br>
                      <Bar data={chartData1} options={options} />
                     </div>
                   )} 
                 </div>


                   <div className=" flex place-content-around h-[350px] mt-5">
                   {(
                     <div className=" w-6/12 h-full bg-white p-20 shadow-lg rounded-xl">
                         <b><h2>Stock Requests Status</h2></b><br></br>
                      <Bar data={chartData2} options={options} />
                     </div>
                   )} 

                   </div>
                   <div className=" flex place-content-around h-[350px] mt-5">
                   {(
                     <div className=" w-6/12 h-full bg-white p-20 shadow-lg rounded-xl">
                         <b><h2>Stock Budget Requests Status</h2></b><br></br>
                      <Bar data={chartData3} options={options} />
                     </div>
                   )} 
                    </div>
                 
                   {/* <div className=" flex place-content-around h-[350px] mt-5">
                
                   </div> */}

                   <div className=" h-52"></div>
                 </div>

             </div>

       </div>

     </div> {/*Right Side container end*/}
   </div> //Main container end

 )
}


