import React, {useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import inv from "../assets/inv.jpg"
import axios from 'axios'
import InventorySideBar from "./InventorySideBar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import editImg from "../assets/edit.png";
import deleteImg from "../assets/delete.png";
import filterImg from "../assets/filter.png";


export default function InvItems() {

  const [Items , setItems] = useState([]);
  const [searchTerm , setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(()=>{

        axios.get("http://localhost:8080/api/inventory/items/")
        .then((res) => {
          setItems(res.data)
        })
        .catch(err => alert(err))

  }, []) 

  console.log(Items) 

  
  const onDelete = (id) => {
  
    axios.delete(`http://localhost:8080/api/inventory/items/${id}`)
    .then((res) => {
      toast.success("item deleted", {position: toast.POSITION.BOTTOM_RIGHT,})
      setItems(Items.filter(item => item._id !== id));
    })
    .catch(err => alert(err))
  
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };



    return (
       //Main container
        <div className="flex scroll-smooth">
          <InventorySideBar />
  

        {/*Right Side container start*/}
        <div className="bg-[#d9d9d9] flex-[85%]">

          {/*Header Part*/}
          <div className="bg-[#2E4960] h-100 w-full shadow-lg">
            <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">ITEMS</h1>

            <div className="flex">

                <div className=" flex p-5">

                <Link to='/additem' 
                className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
                >+ADD</Link> 

                </div>
                  
                  {/*Search*/} 
                  <div className="flex h-10 w-200 mt-3">

                    <input type="text" 
                    className=" rounded-3xl py-2.5 px-5 w-[40vh] ml-[800px] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] mr-2"
                    placeholder="Search item" 
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                    /> 
 
                    
                  </div>
              </div>
          </div>
  
          {/*Body Part*/}
          <div 
            style={{ backgroundImage: `url(${inv})` }}
            className="bg-cover bg-center h-screen w-full fixed" >
                {/*White box*/}
                <div className=" bg-white bg-opacity-90 w-[85%] h-full top-5 left-[80px] overflow-scroll">

                <div className="relative mt-6 ml-[1000px] mb-1">
                  <img src={filterImg} className="absolute top-2 left-2 w-4 h-4" />
                  <select className="pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    <option value="FOOD">FOOD</option>
                    <option value="MEDICINE">MEDICINE</option>
                    <option value="TOYS">TOYS</option>
                    <option value="BATHROOM-ESSENTIALS">BATHROOM ESSENTIALS</option>
                    <option value="GROOMING-EQUIPMENTS">GROOMING EQUIPMENTS</option>
                    <option value="EVENT-ITEMS">EVENT ITEMS</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>

                    {/*Table*/}
                    <table className="mx-auto w-[1250px]">

                    <thead className=" bg-[#FF9F00] text-white sticky top-0">
                        <tr>
                        <th className="p-3">item_code</th>
                        <th className="p-3">item_name</th>
                        <th className="p-3">item_brand</th>
                        <th className="p-3">category</th>
                        <th className="p-3">qty</th>
                        <th className="p-3">action</th>
                        </tr>
                    </thead>
                    
                    <tbody  className="bg-white text-center">

                    {Items.filter((val)=>{
                      if(searchTerm === "") {
                        return val;
                      }else if(val.item_name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                      }else if(val.item_code.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                      }
                    }).filter((val)=>{
                      if(selectedCategory === "") {
                        return val;
                      }else if(selectedCategory.toLowerCase() === val.category.toLowerCase()){
                        return val;
                      }
                    }).map((item) => {
                      return(

                        <>
                        <tr className="hover:bg-[#efeeee]">
                          <td className="p-3">{item.item_code}</td>
                          <td className="p-3 w-[350px]">{item.item_name}</td>
                          <td className="p-3 w-[150px]">{item.item_brand}</td>
                          <td className="p-3 w-[250px]">{item.category}</td>
                          <td className="p-3">{item.qty}</td>
                        
                          <td className="p-3">
                          <div className="flex ml-12">
                              <button className=" items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl">
                                <Link to={`/updateitem/${item._id}`}
                                className="flex">
                                <img src={editImg} alt="editimage" className="w-4 h-4 mr-2 mt-1" />
                                  Edit
                                </Link>
                              </button>
                  
                              <button className="flex px-5 py-1 mr-5 bg-[#d11818] text-white font-semibold hover:bg-[#760d0d] rounded-xl "
                              onClick={() => onDelete(item._id)}>
                              <img src={deleteImg} alt="deleteimage" className="w-4 h-4 mr-2 mt-1" />
                                Delete
                              </button>
                            </div>
                          </td>
                        
                        </tr>
                        </>

                      )
                    })}

                  
                    </tbody>
                    <div className=" h-96"></div>

                    </table>
                </div>

          </div>

        </div> {/*Right Side container end*/}
      </div> //Main container end

    )
}


