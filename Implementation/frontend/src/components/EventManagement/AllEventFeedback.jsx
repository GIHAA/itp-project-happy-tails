import React, {useState,useEffect} from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


export default function AllEventFeedback(){

    const [Feedback,setFeedback] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [matchingEventNames, setMatchingEventNames] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
const [hasResults, setHasResults] = useState(true);
        useEffect(()=>{

        async function getEFeedbacks(){
            try{
            const res = await axios.get("http://localhost:8080/api/eventfeedback/getEFeedbacks")
           
            setFeedback(res.data.allfeedbacks)
               console.log(res.data.allfeedbacks)
               
                
            }catch(err){

                toast.error(err)

            }
        } 

        getEFeedbacks()
        },[])


        function filterContent(report, searchTerm) {
            
            const result = report.filter(
              (r) =>
                r.eventName.toLowerCase().includes(searchTerm.toLowerCase())  ||
                r.eid.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.feedbackid.toLowerCase().includes(searchTerm.toLowerCase()) 
             
            );
            setFeedback(result);
          }
          
          
          
          const handleTextSearch = (e) => {
            const searchTerm = e.currentTarget.value;
            axios.get("http://localhost:8080/api/eventfeedback/getEFeedbacks").then((res) => {
              console.log(res.data.allfeedbacks)
              if (res.data.allfeedbacks) {
                filterContent(res.data.allfeedbacks, searchTerm);
              }else{
                setHasResults(false);
                    // Set the feedback state to an empty array
                  //  setFeedback([]);
                    // Show a message to the user
                 //   alert(`No results found for "${searchTerm}"`);
                  }
            });
          };
          
{/** 
function handleSelectEventName(eventName) {
// Set the search term to the selected event name and update the feedback

setSearchTerm(eventName);
filterContent(Feedback, eventName);




// Clear the list of matching event names
setMatchingEventNames([]);
}
*/}

const onDelete =(id)=>{
          
  axios.delete(`http://localhost:8080/api/eventfeedback/deletefeedback/${id}`).then((res)=>{

  toast.success("Feedback Deleted!!")
  setTimeout(() => {
    window.location.reload();
  }, 5000);
       }).catch((err)=>{

           alert("err")     
       })
}

const handleDelete = (Feedbackid) => {
  confirmAlert({
    title: 'Confirm Delete',
    message: 'Are you sure, you want to delete this event feedback?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          onDelete(Feedbackid);
        }
      },
      {
        label: 'No',
        onClick: () => {}
      }
    ]
  });
};


          return (
            <>
             <div class="p-4 sm:ml-64"  style={{marginTop:'90px'}}>
           <div class="pb-4 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search" onChange={handleTextSearch} class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-96 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by EventID or FeedbackID or EventName"/>
        </div>
    
{/* Render no results message */}
{!hasResults && (
        <p className="text-red-500">No results found.</p>
      )}
    </div>

    
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <h1 className="text-2xl font-bold mb-4">All Feedbacks</h1>
    
{Feedback.length > 0 ? (
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"  style={{backgroundColor: '#FF9F00'}}>
            <tr>
            <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                    Event ID
                </th>
                <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                    Feedback ID
                </th>
            <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                    Event Name
                </th>
                <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                    Customer Name
                </th>
                <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                 Email
                </th>
                <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                Phone Number
                </th>
                <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                    Feedback Type
                </th>
                
                <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                Rating
                </th>
                <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                Price Statisfy
                </th>
                <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                Fun Statisfy
                </th>
                <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                Description
                </th>
                <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                New Idea
                </th>
                <th scope="col" class="px-6 py-3" style={{color: 'white'}}>
                Delete
                </th>
                
            </tr>
        </thead>
        <tbody>
            {Feedback.map((Feedback)=>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" style={{backgroundColor: '#DBD9D5'}}>
               <td class="px-6 py-4" style={{color: 'black'}}>
                {Feedback.eid}
                </td>
                <td class="px-6 py-4" style={{color: 'black'}}>
                {Feedback.feedbackid}
                </td>
               <td class="px-6 py-4" style={{color: 'black'}}>
                {Feedback.eventName}
                </td>
               <td class="px-6 py-4" style={{color: 'black'}}>
                {Feedback.name}
                </td>
                <td class="px-6 py-4" style={{color: 'black'}}>
                {Feedback.email}
                </td>
                <td class="px-6 py-4" style={{color: 'black'}}>
                {Feedback.phoneNumber}
                </td>
                <td class="px-6 py-4" style={{color: 'black'}}>
                {Feedback.feedbackType}
                </td>
                <td class="px-6 py-4" style={{color: 'black'}}>
                {Feedback.rating}
                </td>
                <td class="px-6 py-4" style={{color: 'black'}}>
                {Feedback.priceStatisfy}
                </td>
                <td class="px-6 py-4" style={{color: 'black'}}>
                {Feedback.funStatisfy}
                </td>
                <td class="px-6 py-4" style={{color: 'black'}}>
                {Feedback.description}
                </td>
                <td class="px-6 py-4" style={{color: 'black'}}>
                {Feedback.newIdea}
                </td>
                <td class="px-6 py-4" style={{color: 'black'}}>
                <button style={{ backgroundColor: '#D12222',marginRight:'20px' }} className=" bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text mx-auto p-2 rounded-lg" onClick={()=>handleDelete(Feedback._id)}>Delete</button>
                </td>
            </tr>
            )}
        </tbody>
    </table>

      
) : (
    <p style={{backgroundColor:'#D5ABAF'}}>No feedbacks found.</p>
  )}  
    </div>
         </div>
     </>     
  )
  }





