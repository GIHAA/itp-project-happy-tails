import React, {useState,useEffect} from "react";
import axios from 'axios'
import inv from "../assets/inv.jpg"
import InventorySideBar from "./InventorySideBar";
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const moment = require('moment');


export default function InvDashboard() {

    const [ releasedProcessed , setReleasedProcessed ] = useState([]);
    const [ receivedProcessed , setReceivedProcessed ] = useState([]);
    const [ inStockProcessed , setInStockProcessed ] = useState([]);
  

    useEffect(()=>{
      
      const fetchStockOut = async () => {
        
        try{
          const { data } = await axios.get("http://localhost:8080/api/inventory/releasestockprocessed");
          console.log(data)

          const now = moment();
          const month = now.format('MMMM');

          setReleasedProcessed({
            labels: data.map((item)=> item._id),
            datasets: [
              {
                label: `No of used items by category in ${month}`,
                data: data.map((item)=> item.total_released_qty),
                backgroundColor: [
                  "#B9EDDD",
                  "#F2E3DB",
                  "#DDFFBB",
                  "#B9E9FC",
                  "#F3E8FF",
                  "#E5D1FA",
                  "#EDDBC7"
                ],
                
              }]
            })

        }catch(err){
          console.log(err)
        }

      }
      fetchStockOut()

  }, []) 

//-----------------------------------------------------------------------
  useEffect(()=>{
      
    const fetchStockIn = async () => {
      
      try{
        const { data } = await axios.get("http://localhost:8080/api/inventory/receivedstockprocessed");
        console.log(data)

        const now = moment();
        const month = now.format('MMMM');

        setReceivedProcessed({
          labels: data.map((item)=> item._id),
          datasets: [
            {
              label: `No of received items by category in ${month}`,
              data: data.map((item)=> item.total_received_qty),
              backgroundColor: [
                "#B9EDDD",
                "#F2E3DB",
                "#DDFFBB",
                "#B9E9FC",
                "#F3E8FF",
                "#E5D1FA",
                "#EDDBC7"
              ],
              
            }]
          })

      }catch(err){
        console.log(err)
      }

    }
    fetchStockIn()

}, []) 


//-----------------------------------------------------------------------
useEffect(()=>{
      
  const fetchInStock = async () => {
    
    try{
      const { data } = await axios.get("http://localhost:8080/api/inventory/items/qtyprocessed");
      console.log(data)

      setInStockProcessed({
        labels: data.map((item)=> item._id),
        datasets: [
          {
            label: `All in stock items by category`,
            data: data.map((item)=> item.total_qty_in),
            backgroundColor: [
              "#B9EDDD",
              "#F2E3DB",
              "#DDFFBB",
              "#B9E9FC",
              "#F3E8FF",
              "#E5D1FA",
              "#EDDBC7"
            ],
            
          }]
        })

    }catch(err){
      console.log(err)
    }

  }
  fetchInStock()

}, []) 



function generatePDF() {
  const canvas = document.querySelector("#canvas");

  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  html2canvas(canvas)
    .then(function (canvas) {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm');

      // Resize the image to 50mm width and 50mm height
      doc.addImage(imgData, 'PNG', 1, 10, 200, 140);

      doc.save('report.pdf');
    })
    .catch(function (error) {
      console.error("Error generating PDF:", error);
    });
}




    return (
       //Main container
        <div className="flex scroll-smooth">
          <InventorySideBar />
  

        {/*Right Side container start*/}
        <div className=" flex-[85%]">
  
          {/*Body Part*/}
          <div 
            style={{ backgroundImage: `url(${inv})` }}
            className="bg-cover bg-center h-screen w-full fixed" >

              <div className=" bg-[#2E4960] flex place-content-around w-[85%]">
                    <h1 className=" text-center text-4xl text-slate-50 p-8">INVENTORY MANAGEMENT DASHBOARD</h1>
                                         
                    <div>
                        <button
                        className=" bg-slate-300 p-3 mt-7"
                        onClick={generatePDF}
                        >Generate Report</button>
                      </div>
              </div >

                {/*White box*/}
                <div 
                id="canvas"
                className=" bg-white bg-opacity-95 w-[85%] h-[100%] absolute overflow-scroll">
                

                  <div className="flex place-content-around">

                      {releasedProcessed && releasedProcessed.datasets && (
                        <div className=" w-5/12 ">
                          <Bar 
                            data={releasedProcessed}
                          />
                          </div>
                      )} 

                      {inStockProcessed && inStockProcessed.datasets && (
                        <div className=" w-1/4">
                          <Pie 
                            data={inStockProcessed}
                            options={{
                              plugins: {
                                legend: { position: 'right'},
                                title : { display: true, text: "Items In Stock"}
                              }
                            }}
                            
                          />
                          </div>
                      )} 
                    </div>

                      {receivedProcessed && receivedProcessed.datasets && (
                        <div className=" w-5/12 ml-[350px]">
                          <Bar 
                            data={receivedProcessed}
                          />
                        </div>
                      )}

                </div>

          </div>

        </div> {/*Right Side container end*/}
      </div> //Main container end

    )
}



