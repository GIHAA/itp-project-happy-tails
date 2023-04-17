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

          </Routes>
      <Footer />
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
