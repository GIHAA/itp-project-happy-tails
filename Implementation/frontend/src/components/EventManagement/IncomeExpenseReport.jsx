import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import name from '../../assets/logo.png'
import 'jspdf-autotable';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const IncomeExpenseReport = () => {

  const [events, setEvents] = useState([]);
  const [register, setRegister] = useState([]);
  const [budget, setBudget] = useState([]);
  const [data, setData] = useState([]);
  const [eventAmount, setEventAmount] = useState([]);

  const generatePDFamount = () => {
    const doc = new jsPDF('landscape', 'px', 'a4', false);
    const imgWidth = 500;
    const imgHeight = 400;
    const xPos = 65;
    const yPos = 20;
    
    // Draw gray rectangle
    doc.setFillColor(200);
    doc.rect(xPos, yPos, imgWidth, imgHeight, 'F');
    
    // Add image on top of rectangle
    doc.addImage(name, 'JPG', xPos, yPos, imgWidth, imgHeight);
    doc.addPage();

    doc.setFontSize(18);
doc.setTextColor('#444444');
doc.text('Happy Tails', doc.internal.pageSize.width / 2, 30, { align: 'center' });
doc.text('All Event Income-Expense Report', doc.internal.pageSize.width / 2, 50, { align: 'center' });

// Add horizontal line after the header
doc.setLineWidth(0.5);
doc.setDrawColor('#444444');
doc.line(20, 60, doc.internal.pageSize.width - 20, 60);

const headers = [
  'Event ID',
  'Event Name',
  'Price',
  'Number of ticket',
  'Total Income',
  'Total Expense',
  'Result',
  'Result Rate'
];

const data = eventAmount.map((event) => {
  const { eid, eventName, price, noOfTicket, totalIncome, totalExpense, result, rate } = event;
 
  
  return {
    eid,
    eventName,
    price,
    noOfTicket,
    totalIncome,
    totalExpense,
    result,
    rate
  };
});


    // const data = events.map((event) => {
    //   let ticketCount = 0;
    //   let expense = 0;
    //   let rate = 0;
    //   let result = "";

    //   register.forEach((reg) => {
    //     if (event.name === reg.eventName) {
    //       ticketCount += Number(reg.noOfTicket);
    //     }
    //   });

    //   const income = ticketCount * event.price;

    //   budget.forEach((bud) => {
    //     if (event.name === bud.eventName && 
    //         event.eid === bud.eid && 
    //         bud.status === "Accepted" && 
    //         bud.amountStatus === "Paid") {
    //       expense += Number(bud.total);
    //     }
    //   });


    //   if (expense === 0 || income === 0) {
    //     result = "Not started";
    //     rate = 0;
    //   } else {
    //     result = ticketCount * event.price > expense ? "Profit" : "Loss";
    //     rate = ((ticketCount * event.price - expense) / expense) * 100;
    //   }

    //       return {
    //         eid:event.eid,
    //         eventName: event.name,
    //         price: event.price,
    //         ticketCount: ticketCount,
    //         revenue: income,
    //         expense: expense,
    //         result: result,
    //         rate: rate.toFixed(2)
    //       };
  //});
  

  

  // Set table margin to center horizontally and position vertically up from top
  const tableWidth = 500; // Adjust table width as needed
  const tableHeight = 30 + data.length * 10; // Adjust table height as needed
  const horizontalMargin = (doc.internal.pageSize.getWidth() - tableWidth) / 2;
  const verticalMargin = 100; // Adjust vertical margin as needed
  const startY = verticalMargin - 20; // Subtract 20 to offset for table header

  // Create table with margin and didDrawPage properties
  doc.autoTable({
    head: [headers],
    body: data.map(obj => Object.values(obj)),
    margin: { top: startY, left: horizontalMargin, right: horizontalMargin },
    didDrawPage: (data) => {
      data.settings.margin.top = startY;
    },
  });

  doc.save('AllEventIncomeExpenseReport.pdf');
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/eventregister/getbooking"
        );
        setRegister(response.data.allbooking);

        const response2 = await axios.get(
          "http://localhost:8080/api/eventbudget/getBudgets"
        );
        setBudget(response2.data.allbudget);

        const response3 = await axios.get(
          "http://localhost:8080/api/event/getEvents"
        );
        setEvents(response3.data.allevents);

        const response4 = await axios.get(
          "http://localhost:8080/api/eventamount/geteamounts"
        );
        setEventAmount(response4.data.alleamount);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);
//console.log(eventAmount)
  // useEffect(() => {
  //   if (events.length === 0 || register.length === 0 || budget.length === 0) {
  //     return;
  //   }
  //   const eventsData = events.map((event) => {
  //     let ticketCount = 0;
  //     let expense = 0;
  //     let rate = 0;
  //     let result = "";

  //     register.forEach((reg) => {
  //       if (event.name === reg.eventName) {
  //         ticketCount += Number(reg.noOfTicket);
  //       }
  //     });

  //     const income = ticketCount * event.price;

  //     budget.forEach((bud) => {
  //       if (event.name === bud.eventName && 
  //           event.eid === bud.eid && 
  //           bud.status === "Accepted" && 
  //           bud.amountStatus === "Paid") {
  //         expense += Number(bud.total);
  //       }
  //     });
      


  //     if (expense === 0 || income === 0) {
  //       result = "Not started";
  //       rate = 0;
  //     } else {
  //       result = ticketCount * event.price > expense ? "Profit" : "Loss";
  //       rate = ((ticketCount * event.price - expense) / expense) * 100;
  //     }

  //     return {
  //       eid: event.eid,
  //       eventName: event.name,
  //       price: event.price,
  //       ticketCount: ticketCount,
  //       revenue: income,
  //       expense: expense,
  //       result: result,
  //       rate: rate.toFixed(2),
  //     };
  //   });
  //   setData(eventsData);
  // }, [events, register, budget]);

  function filterContent(report, searchTerm) {
            
    const result = report.filter(
      (r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase())  ||
        r.eid.toLowerCase().includes(searchTerm.toLowerCase())
     
    );
    setEvents(result);
  }
  const handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    axios.get("http://localhost:8080/api/event/getEvents").then((res) => {
      console.log(res.data.allevents)
      if (res.data.allevents) {
        filterContent(res.data.allevents, searchTerm);
      }
    });
  };

  return (
    <>
   
   <div class="p-4 sm:ml-64"  style={{marginTop:'90px'}}>
   <div class="pb-4 bg-white dark:bg-gray-900" style={{marginRight:'5px'}}>
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative mt-1 flex-shrink-0">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="table-search" onChange={handleTextSearch} class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{marginRight:'5px'}} placeholder="Search for Event Name or Event ID"/>
            </div>
        </div>
   <span style={{ marginRight: '10px', fontSize:'20px',  }}>Events Income-Expense</span>
     <button style={{ backgroundColor: '#459DE8'}} className="block bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text mx-auto p-2 rounded-lg" onClick={generatePDFamount}>Download PDF</button>
    {/* <button style={{ backgroundColor: '#E471D2' }} className="block bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text mx-auto p-2 rounded-lg" onClick={(e) => addIncomeExpense(e)}>View Bar Chart</button> */}
    
     
     <div class="relative overflow-x-auto shadow-md sm:rounded-lg"  style={{marginTop:'10px'}}>
     <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
         <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"  style={{backgroundColor: '#FF9F00'}}>
             <tr>
             <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                     Event ID
                 </th>
             <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                     Event Name
                 </th>
                 <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                     Price
                 </th>
                 <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                  Number of tickets
                 </th>
                 <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                 Total Income
                 </th>
                 <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                    Total Expense
                 </th>
                 
                 <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                 Result
                 </th>
                 <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                 Result rate
                 </th>
               
                
             </tr>
         </thead>
         <tbody>
  {eventAmount.length > 0 ? (
    eventAmount.map((event) => {
      return (
        <tr 
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          style={{ backgroundColor: "#DBD9D5", color: "black" }}
        >
          <td className="px-6 py-4">{event.eid}</td>
          <td className="px-6 py-4">{event.eventName}</td>
          <td className="px-6 py-4">{event.price}</td>
          <td className="px-6 py-4">{event.noOfTicket}</td>
          <td className="px-6 py-4">{event.totalIncome}</td>
          <td className="px-6 py-4">{event.totalExpense}</td>
          <td className="px-6 py-4">{event.result}</td>
          <td className="px-6 py-4">{event.rate}</td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="7" style={{ backgroundColor: "#D5ABAF", fontSize: "20px" }}>
        No events found.
      </td>
    </tr>
  )}
</tbody>

 
     </table>
 </div>
       
    </div>
    </>
);
};
export default IncomeExpenseReport;
