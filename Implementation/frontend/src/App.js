import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/common/Header';
import Home from './components/Home';
import VetPortal from './components/portals/VetPortal';
import AllPetProfile from './components/Animal_Management/Pet_Profile/petProfile';
import AddPetProfile from './components/Animal_Management/Pet_Profile/AddPetProfile';
import UpdatePetProfile from './components/Animal_Management/Pet_Profile/UpdatePetProfile';
import ProfilePage from './components/Animal_Management/Pet_Profile/ProfilePage';
import HealthProfile from './components/Animal_Management/Health_Profile/HealthProfile';
import AddHealth from './components/Animal_Management/Health_Profile/AddHealth';
import DisplayHealth from './components/Animal_Management/Health_Profile/DisplayHealth';
import Addvac from './components/Animal_Management/Health_Profile/Addvac'
import AdoptPet from './components/adoptPetPage/AdoptPet';
import Footer from './components/common/Footer';
import UpdateVac from './components/Animal_Management/Health_Profile/UpdateVac';
import Dashboard from './components/Animal_Management/Dashboard/Dashboard';
import Shelterpets from './components/Animal_Management/Pet_Profile/ShelterPets';
import Breed from './components/Animal_Management/Pet_Profile/Breed';
// import VetPortal from './components/portals/VetPortal';
// import AllPetProfile from './components/petProfile';
// import AddPetProfile from './components/AddPetProfile';
// import UpdatePetProfile from './components/UpdatePetProfile';
// import AdoptPet from './components/adoptPetPage/AdoptPet';
// import ShelterPet from './components/shelterPetPage/ShelterPet';
// import UserPortal from './components/User/UserProtal';
// import Booking from './components/User/Booking';
// import Events from './components/User/Events';
// import Pets from './components/User/Pets';
// import Profile from './components/User/Profile';
import VehicleDashboard from './components/VehicleDashboard';
import EditVehicle from './components/EditVehicle';
import Vehicles from './components/Vehicles';
import AddNewVehicle from './components/AddNewVehicle';
import PendingBookings from './components/PendingBookings';
import AddAvailability from './components/AddAvailability';
import Availabilities from './components/Availabilities';
import EditAvailabilities from './components/EditAvailabilities';
import AddTBooking from './components/AddTBooking';
import AddVehicleBudgetRequestForm from './components/AddVehicleBudgetRequest';
import AllVBudgetRequests from './components/AllVBudgetRequests';
import VHome from './components/VHome';


function App() {
  return (
    <>
    <Router>
      <div className="App">
      {/* <Header /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            

            //user
            {/* <Route path='user' element={<UserPortal />} />
              <Route path='profile' element={<Profile />} />
              <Route path='booking' element={<Booking />} />
              <Route path='pets' element={<Pets />} />
              <Route path='Events' element={<Events />} /> */}

          </Routes>
      {/* <Footer /> */}
      </div>
    </Router>

    <Router>
      <div className="App">
          <Routes>
            <Route path='petprofile' element={<VetPortal />}>
                <Route path='updatepet/:id' element={<UpdatePetProfile />} />
                <Route path='allpetprofile' element={<AllPetProfile />} />
                <Route path='addpet' element={<AddPetProfile />} />
                <Route path='addhealthprofile' element={<AddHealth />} />  
                <Route path='profilepage/:id' element={<ProfilePage />} />
                <Route path='healthprofile' element={<HealthProfile />} />
                <Route path='displayhealth/:id' element={<DisplayHealth />} />
                <Route  path='addvac/:id/:state' element={<Addvac/>}/>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='spets' element={<Shelterpets />} />
                <Route path='breed' element={<Breed />} />
                <Route path='upvac/:id/:index/:state' element={<UpdateVac />} />
            </Route>
          </Routes>
      </div>
    </Router>

    <Router>
          <div className="App">
            
        
              <Routes>
                
              

                <Route path= '/vhome' exact element={<VHome/>}/>

                <Route path= '/vehicledashboard' exact element={<VehicleDashboard/>}/>
                <Route path='/vehicles' exact element={<Vehicles />} />
                <Route path= '/editvehicle/:id'  exact element={<EditVehicle/>}/>
                <Route path= '/addnvehicle'  exact element={<AddNewVehicle/>}/>

                <Route path= '/pending'   element={<PendingBookings/>}/>
                <Route path= '/tbooking'  exact element={<AddTBooking/>}/>

                <Route path= '/availability'  exact element={<Availabilities/>}/>
                <Route path= '/addavailability'  exact element={<AddAvailability/>}/>
                <Route path= '/editavailability/:id'  exact element={<EditAvailabilities/>}/>

                <Route path= '/vbudgets/:id'  exact element={<AllVBudgetRequests/>}/>
                <Route path= '/addvbudget'  exact element={<AddVehicleBudgetRequestForm/>}/>

              </Routes>
          </div>
        </Router>
    <ToastContainer />
    </>
  );
}

export default App;
