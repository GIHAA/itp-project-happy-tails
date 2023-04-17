import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/common/Header';
import Home from './components/Home';
// import VetPortal from './components/portals/VetPortal';
// import AllPetProfile from './components/petProfile';
// import AddPetProfile from './components/AddPetProfile';
// import UpdatePetProfile from './components/UpdatePetProfile';
// import AdoptPet from './components/adoptPetPage/AdoptPet';
import Footer from './components/common/Footer';
// import ShelterPet from './components/shelterPetPage/ShelterPet';
// import UserPortal from './components/User/UserProtal';
// import Booking from './components/User/Booking';
// import Events from './components/User/Events';
// import Pets from './components/User/Pets';
// import Profile from './components/User/Profile';
import InvDashboard from './components/InvDashboard';
import InvItems from './components/InvItems';
import InvAddItem from './components/InvAddItem';
import InvItemUpdate from './components/InvItemUpdate';
import InvRequestStock from './components/InvRequestStock';
import InvRequestedStock from './components/InvRequestedStock';
import InvReleaseStock from './components/InvReleaseStock';
import InvStockIn from './components/InvStockIn';
import InvStockOut from './components/InvStockOut';



function App() {
  return (
    <>
    <Router>
      <div className="App">
      <Header />
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

            //inventory
            <Route path='/inventory' element={<InvDashboard />} />
            <Route path='/items' element={<InvItems />} />
            <Route path='/additem' element={<InvAddItem />} />
            <Route path='/updateitem/:id' element={<InvItemUpdate />} />
            <Route path='/requeststock' element={<InvRequestStock />} />
            <Route path='/requestedstock' element={<InvRequestedStock />} />
            <Route path='/releasestock' element={<InvReleaseStock />} />
            <Route path='/stockin' element={<InvStockIn />} />
            <Route path='/stockout' element={<InvStockOut />} />



          </Routes>

          
      <Footer />
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
