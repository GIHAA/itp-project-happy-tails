import { Link, Outlet } from 'react-router-dom'
import logo from '../../assets/Fina.logo.png'



// function FinaLeftBar(){
//     return(

//         <div class=" mr-20 fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-yellow-500 h-full text-white transition-all duration-300 border-none z-10 sidebar">
//         <div class="overflow-y-auto  overflow-x-hidden flex flex-col justify-between flex-grow">
//           <ul class="flex flex-col py-4 space-y-1 mb-6">
//             <li class="px-5 hidden md:block">
//               <div class=" flex-row items-center h-8">
//                 {/* <img src="https://user-images.githubusercontent.com/99266866/231847144-7645e87b-f553-4de4-84c9-bd4522f979e3.gif" class="w-100"></img> */}
//                 <div class="text-sm font-light tracking-wide text-gray-400 uppercase">Financial Manager</div>
//               </div>
//             </li>
//             <li>
//               <a href="./FinaDashBoard" class=" mb-4 mx-8 w-40 rounded-2xl relative flex flex-row items-center h-11 focus:outline-none bg-sky-900  hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-0">
//                 <span class="inline-flex justify-center items-center ml-8">
//                   <svg class="w-3 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
//                 </span>
//                 <span class="ml-2 text-sm tracking-wide truncate">Dashboard</span>
//               </a>
//             </li>
//             <li>
//               <a href="./GetTransaction" class=" mb-4 mx-8 w-40 rounded-2xl relative flex flex-row items-center h-11 focus:outline-none bg-sky-900  hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-0">
//                 <span class="inline-flex justify-center items-center ml-4">
//                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
//                 </span>
//                 <span class="ml-2 text-sm tracking-wide truncate">Transactions</span>
//               </a>
//             </li>
//             <li>
//               <a href="./GetBooking" class=" mb-4 mx-8 w-40 rounded-2xl relative flex flex-row items-center h-11 focus:outline-none bg-sky-900  hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-0">
//                 <span class="inline-flex justify-center items-center ml-4">
//                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
//                 </span>
//                 <span class="ml-2 text-sm tracking-wide truncate">Bookings</span>
//               </a>
//             </li>
//             <li>
//               <a href="./GetPayment" class=" mb-4 mx-8 w-40 rounded-2xl relative flex flex-row items-center h-11 focus:outline-none bg-sky-900  hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-0">
//                 <span class="inline-flex justify-center items-center ml-4">
//                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
//                 </span>
//                 <span class="ml-2 text-sm tracking-wide truncate">Payments</span>
//                 {/* <span class="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">New</span> */}
//               </a>
//             </li>
//             <li>
//               <a href="./GetDoanation" class=" mb-4 mx-8 w-40 rounded-2xl relative flex flex-row items-center h-11 focus:outline-none bg-sky-900  hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-0">
//                 <span class="inline-flex justify-center items-center ml-4">
//                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
//                 </span>
//                 <span class="ml-2 text-sm tracking-wide truncate">Donations</span>
//               </a>
//             </li>
//             <li>
//               <a href="./GetOrganization" class=" mb-4 mx-8 w-40 rounded-2xl relative flex flex-row items-center h-11 focus:outline-none bg-sky-900  hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-0">
//                 <span class="inline-flex justify-center items-center ml-4">
//                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
//                 </span>
//                 <span class="ml-2 text-sm tracking-wide truncate">Organizations</span>

//               </a>
//             </li>

//             <li>
//               <a href="www.google.comww.google.com" class=" mb-4 mx-8 w-40 rounded-2xl relative flex flex-row items-center h-11 focus:outline-none bg-sky-900  hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-0">
//                 <span class="inline-flex justify-center items-center ml-4">
//                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
//                 </span>
//                 <span class="ml-2 text-sm tracking-wide truncate">Scan</span>
//               </a>
//             </li>
//             <li>
//               <a href="./Reports" class=" mb-4 mx-8 w-40 rounded-2xl relative flex flex-row items-center h-11 focus:outline-none bg-sky-900  hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-0">
//                 <span class="inline-flex justify-center items-center ml-4">
//                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                   </svg>
//                 </span>
//                 <span class="ml-2 text-sm tracking-wide truncate">Reports</span>
//               </a>
//             </li>
//           </ul>

//         </div>
//       </div>





//     )
// }



// function Statics(){
//     return(


//       <div class="flex justify-center flex-cols-1 gap-4 mt-20 ">
//       <div class=" bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
//             <div class=" flex justify-center items-center gap-4 w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
//               <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
//             </div>
//             <div class="text-right">
//               <p class="text-2xl">557</p>
//               <p>Orders</p>
//             </div>
//           </div>
//           <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
//             <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
//               <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
//             </div>
//             <div class="text-right">
//               <p class="text-2xl">$11,257</p>
//               <p>Sales</p>
//             </div>
//           </div>
//           <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
//             <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
//               <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//             </div>
//             <div class="text-right">
//               <p class="text-2xl">$75,257</p>
//               <p>Balances</p>
//             </div>
//           </div>
//     </div>






//     )
// }


function FinaLeftBar() {
  return (
    <>
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">Open sidebar</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="default-sidebar" class="fixed top-0 left-0 z-100 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto bg-[#FF9F00]">

          <div>
            <img src={logo} alt="logo" className=" w-[150px] h-[100px] mx-auto"></img>
            <h3 className=" text-[#2E4960] font-bold text-l text-center w-[150px] leading-5 my-2 tracking-wide mx-auto">
              Finance Management
            </h3>
          </div>

          <div className="my-6 ">

            <Link to='./FinaDashBoard'
              className=" bg-[#2E4960] px-[15px] hover:bg-[#797979] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
            >DASHBOARD</Link>

            <Link to="./GetTransaction"
              className=" bg-[#2E4960] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
            >TRANSACTION</Link>

            <Link to="./GetBooking"
              className=" bg-[#2E4960] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
            >BOOKINGS</Link>

            <Link to='./GetPayment'
              className=" bg-[#2E4960] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
            >PAYMENT</Link>

            <Link to='./GetDoanation'
              className=" bg-[#2E4960] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
            >DONATIONS</Link>

            <Link to='./GetOrganization'
              className=" bg-[#2E4960] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
            >ORGANIZATIONS</Link>

            <Link to='./FinaPaymentReports'
              className=" bg-[#2E4960] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
            >REPORTS</Link>
          </div>
        </div>

      </aside>
      <Outlet />
   





    <div>
      <nav className="bg-[#2E4960] fixed inset-x-0 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 ">
            <div className="flex w-full">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
                  alt="Workflow"
                />

              </div>
              <div className="hidden md:block ml-28">
                <div className="ml-28 flex justify-between space-x-4">
                  <a
                    href="www.google.com"
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </a>

                  <a
                    href="www.google.com"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Team
                  </a>

                  <a
                    href="www.google.com"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Projects
                  </a>

                  <a
                    href="www.google.com"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ml-28"
                  >
                    Calendar
                  </a>

                  <a
                    href="www.google.com"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ml-28"
                  >
                    Reports
                  </a>

                  <div class="flex items-center ml-60">
                    <div class="ml-96">
                      <a href="www.google.comlogin" class="text-gray-300 hover:text-white font-medium">Login</a>
                    </div>
                    <div class="ml-4">
                      <a href="www.google.comlogout" class="bg-white text-gray-800 py-2 px-4 rounded-md font-medium hover:bg-gray-200">Logout</a>
                    </div>
                  </div>

                </div>


              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="www.google.com"
              className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </a>

            <a
              href="www.google.com"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Team
            </a>

            <a
              href="www.google.com"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Projects
            </a>

            <a
              href="www.google.com"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Calendar
            </a>

            <a
              href="www.google.com"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Reports
            </a>
          </div>
        </div>
      </nav>



    </div>
    </>
  )
}


export default FinaLeftBar ;


