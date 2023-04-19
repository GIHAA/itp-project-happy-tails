import React, {useState,useEffect} from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllEvent(){

    const [events,setEvent] = useState([]);
    const [bookings,setBooking] = useState([]);
    const [totalTicket,setTotalNoOfTickets] = useState(0);
    const [size,setSize] = useState(0)

        useEffect(()=>{

        async function getevents(){
            try{
            const res = await axios.get("http://localhost:8080/api/event/getEvents")
            console.log(res.data)
            setEvent(res.data.allevents)
            
            //console.log(events)
                
            }catch(err){

                alert(err)

            }
        } 

        getevents()
        },[])

        useEffect(() => {
          async function getbookings() {
            try {
              const res = await axios.get("http://localhost:8080/api/eventregister/getbooking");
              const allBookings = res.data.allbooking;
              const totalNoOfTickets = allBookings.reduce((acc, booking) => acc + booking.noOfTicket, 0);
              setBooking(allBookings);
              setTotalNoOfTickets(totalNoOfTickets);
              
            } catch (err) {
              alert(err);
            }
          }
        
          getbookings();
        }, []);
        const onDelete =(id)=>{
            axios.delete(`http://localhost:8080/api/event/deleteEvent/${id}`).then((res)=>{

            toast.success("Event Deleted!!")
            setTimeout(() => {
              window.location.reload();
            }, 5000);
                 }).catch((err)=>{
     
                     toast.error(err)     
                 })
        }
        console.log(totalTicket)
        function filterContent(report, searchTerm) {
            
          const result = report.filter(
            (r) =>
              r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              r.eid.toLowerCase().includes(searchTerm.toLowerCase())
           
          );
          setEvent(result);
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


        const handleEdit = async(eventId,eid) => {
          const res = await axios.get("http://localhost:8080/api/eventregister/getbooking");
          const allBookings = res.data.allbooking;
          console.log(allBookings)
          const filteredBookings = allBookings.filter(booking => booking.eid === eid);
          const totalNoOfTickets = filteredBookings.reduce((acc, booking) => acc + booking.noOfTicket, 0);

          console.log(totalNoOfTickets)
          const response = await axios.get("http://localhost:8080/api/event/getEvents");
          const allevents = response.data.allevents;
          console.log(allevents)
          const filteredEvent = allevents.filter(event => event.eid === eid);
          console.log(filteredEvent)
          if (filteredEvent[0].size !== "unlimited" && filteredEvent[0].size <= totalNoOfTickets) {
            toast.error("Sorry. Not enough tickets available!");
            return;
          } else if (filteredEvent[0].size > totalNoOfTickets) {
            const remaining = Number(filteredEvent[0].size) - Number(totalNoOfTickets);
            if (remaining <= 10) {
              toast.warning(`Only ${remaining} tickets are available. If you wish you can book it`);
              setTimeout(() => {
                window.location.href = `/eventdashboard/addbooking/${eventId}`;
              }, 5000);
              return; // Add a return statement to exit the function if the error message is displayed
            }
          }
          
          window.location.href = `/eventdashboard/addbooking/${eventId}`;
          
         
        };
        


        

   return(
    <>



<div class="p-4 sm:ml-64" style={{marginTop:'70px'}}>
<div className="flex justify-center items-center h-full " style={{marginTop:'70px'}}>
  <div className="bg-white rounded-lg shadow-2xl p-8 m-4 w-3/4" style={{ backgroundColor: "#ffffff" }}>
<div class="pb-4 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search" onChange={handleTextSearch} class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Event Name or Event ID"/>
        </div>
    </div>
    
  
   

<h1 className="text-2xl font-bold mb-4">All Events</h1>
{events.length > 0 ? (
    
    events.map((event,index)=>{
    
      const currentDate = new Date();
const eventDate = new Date(`${event.date} ${event.startTime}`);
//console.log(currentDate)
//console.log(eventDate)
if (eventDate >= currentDate && event.status === 'Available') {
          return(  
                 
            <div class="flex flex-col space-x-4 text-center bg-gray-500 shadow-lg shadow-gray-500/50 rounded-lg w-full mx-20" style={{margin: '20px', backgroundColor:"#EFF0F6"}}>
    
    <div class="flex justify-between" style={{marginTop:'20px'}}>
  <div style={{marginLeft:'20px'}}>{event.eid}</div>
  <div style={{width:'100%', textAlign:'center'}}>{event.name}</div>   
</div>

            <div class="grid grid-rows-3 grid-flow-col gap-4">
            
        <div class="row-span-3 ..."><div class="flex-shrink-0">
          <img src={event.image} class="w-48 h-48 object-cover rounded-lg" style={{marginTop:'20px',marginLeft:'20px'}}/>
        </div>
        
        </div>
        <div class="col-span-2 ...">
          <div class="flex justify-end items-center mb-4" style={{marginRight:'20px',marginTop:'20px'}}>
           
          <div><button style={{ backgroundColor: '#1FE23F',marginRight:'20px'   }} className="bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text mx-auto p-2 rounded-lg" onClick={()=>handleEdit(event._id,event.eid)}>Register</button></div>      
  <div><button style={{ backgroundColor: '#459DE8'}} className="bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text mx-auto p-2 rounded-lg" ><a href={`/addFeedback/${event._id}`}>Feedback</a></button></div> 
  


</div>
   
   </div>
   <div class="row-span-2 col-span-2 ..."> 
  
   <div style={{textAlign:"left"}}>{event.description}</div>
     <div style={{textAlign:"left"}}>Starting from {event.startTime} and ended at {event.endTime}.</div>
     <div style={{textAlign:"left"}}>This will be held at {event.venue} on {event.date}</div>
     <div style={{textAlign:"left",marginBottom:'20px'}}>Price per person : Rs.{event.price}</div>
     <div style={{textAlign:"left",marginBottom:'20px'}}>Maximum Participant : {event.size}</div>
     </div>
 </div>
        
 
     </div>
            
        
)
          }else{
            return null;
          }
})
        ) : (
          <p style={{backgroundColor:'#D5ABAF'}}>No events found.</p>
        )}  
          </div>
             </div>
             </div>
            

           </>     
        )
        }
        
        




