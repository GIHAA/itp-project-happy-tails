import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Breed() {
  const [breeds, setBreed] = useState([]);
  const [speciesOne, setSpecies] = useState([]);
  const [allbreeds, setAllBreed] = useState([]);
  const [upModelIsOpen, setUpModelOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [breedId, setId] = useState("");
  const [upId, setUpId] = useState("");


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/petbreed/getbreed`)
      .then((response) => {
        console.log(response.data.allbreed);
        setAllBreed(response.data.allbreed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  function addbreed(e) {
    e.preventDefault();
    const newBreed = {
      breeds,
      speciesOne

    };
    axios.post("http://localhost:5000/api/petbreed/addbreed", newBreed)
      .then(() => {

        setBreed("");

        toast.success('Breed Added successfully',{
          autoClose: 500, 
        });
        setTimeout(() =>    window.location.href = `/petprofile/breed`, 1000);
      })
      .catch((err) => {
        alert(`Failed to add pet: ${err}`);
      });
  }


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  
  const openUpModal = () => {
    setUpModelOpen(true);
  };

  const closeUpModal = () => {
    setUpModelOpen(false);
  };

  function handleClick(id,upid) {
    setId(id); // Call the setID function first
    setUpId(upid)
    console.log(id)
    console.log(allbreeds)
    openUpModal(); // Then open the modal
  }

         
    // async function getbreed(){
    //     try{
    //       console.log(breedId)
    //     const res = await axios.get(`http://localhost:5000/api/vet/getonebreed/${breedId}`)
    //     setOneBreed(res.data.oneBreed)
      
    //     console.log(onebreed)
            
    //     }catch(err){

    //         alert(err)

    //     }
    // } 


    async function UpdateData(e){

   
      e.preventDefault();

      try{

      const newbreed = {
       
          breeds,
          speciesOne
      
      }


     await axios.put(`http://localhost:5000/api/petbreed/breedupdate/${upId}`,newbreed)
    
     toast.success('Breed Updated successfully',{
      autoClose: 500, 
    });
    setTimeout(() =>    window.location.href = `/petprofile/breed`, 1000);
  
     }catch (err){
      console.error(err);
    }

  }

  const onDelete =(id)=>{
    toast.warn(
      <div>
        <p class="text-red-700 ml-8">Do you want to delete ?</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ marginRight: '1rem' }} onClick={() => {
    
            axios.delete(`http://localhost:5000/api/petbreed/deletebreed/${id}`).then((res) => {
    
            }).catch((err) => {
    
              toast.warning(err)
            })
            toast.success('Item Updated successfully',{
              autoClose: 1000, 
            });
            setTimeout(() => {
              window.location.href = `/petprofile/breed`;
            }, 1500);
            
          }}>Yes</button>
          <button onClick={() => toast.dismiss()}>No</button>
        </div>
      </div>,
      { autoClose:false }
    );
    
}



function filterContent(breed, searchTerm) {
 
  const result = breed.filter(
    (r) =>
      r.breed.toLowerCase().includes(searchTerm.toLowerCase())
     
     
  );
  setAllBreed(result);
}



const handleTextSearch = (e) => {
  const searchTerm = e.currentTarget.value;
  axios.get("http://localhost:5000/api/petbreed/getbreed").then((res) => {
    if (res.data.allbreed) {
      filterContent(res.data.allbreed, searchTerm);
    }
  });
};



  return (
    <div>

<button onClick={openModal} className="bg-blue-500 mt-[150px] ml-[1150px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        ADD Breed
      </button>

      <form class="flex items-center -mt-[40px] ml-[270px]">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-[300px] ml-[230px]">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="simple-search"  onChange={handleTextSearch} class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by ID or Breed" required/>
    </div>
</form>
<div class='overflow-x-auto w-1/2 mt-[5px] ml-[500px] max-h-[500px] '>

        <table class='mx-auto max-w-5xl mt-10 w-full whitespace-nowrap shadow-2xl rounded-lg bg-white divide-y divide-gray-300 overflow-hidden table-auto'>
          <thead class="bg-[#2E4960] sticky top-0">
            <tr class="text-white text-left">

              <th class="font-semibold text-sm uppercase text-center px-6 py-4"> BREED </th>
              <th class="font-semibold text-sm uppercase text-center px-6 py-4"> SPECIES </th>
              <th class="font-semibold text-sm uppercase px-6 py-4 text-center"> Action </th>

            </tr>
          </thead>
          <tbody class="divide-y divide-gray-400">
            {allbreeds.map((allbreed, index) =>
              <tr key={index} class="bg-gray-200 hover:bg-slate-100">
                <td class="px-6 py-4 text-center"> {allbreed.breed}</td>
                <td class="px-6 py-4 text-center"> {allbreed.species}</td>
              

                <td class="py-3 px-6 text-center">

                  <div class="flex item-center justify-center">

                  <button onClick={() => handleClick(index,allbreed._id)}>
                      <div class="w-4 mr-2 transform hover:text-yellow-500 hover:scale-110">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>

                      </div>
                    </button>

                 

                    <button  onClick={()=>onDelete(allbreed._id)}>
                      <div class="w-4 mr-2 transform hover:text-red-600 hover:scale-110">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>

                      </div>
                    </button>

                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalIsOpen} className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity">
        <form className="bg-white shadow-md rounded px-8 ml-[150px] pt-6 pb-8 mb-4" onSubmit={addbreed}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            BREED :
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Eg : Bulldog" name="breed" id="breed" onChange={(e) => {
              setBreed(e.target.value)
            }} />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Species :
            </label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Eg : Bulldog" name="breed" id="breed" onChange={(e) => {
              setSpecies(e.target.value)
            }} >

          <option selected>Choose species</option>
         <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>

              </select>
          </div>


          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Add
            </button>
            <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Close
            </button>
          </div>
        </form>
      </Modal>


      <Modal isOpen={upModelIsOpen} className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity">
        <form className="bg-white shadow-md  ml-[150px] rounded px-8 pt-6 pb-8 mb-4" onSubmit={UpdateData}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              BREED
            </label>
            <input defaultvalue={breedId} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Eg : Bulldog" name="breed" id="breed" onChange={(e) => {
              setBreed(e.target.value)
            }} />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Species :
            </label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Dog/Cat" name="breed" id="breed" onChange={(e) => {
              setSpecies(e.target.value)
            }} >

          <option selected>Choose species</option>
         <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>

              </select>
          </div>




          <div className="flex items-center justify-between ">
            <button className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Update
            </button>
            <button onClick={closeUpModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
