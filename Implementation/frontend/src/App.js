import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/common/Header";
import Home from "./components/Home";
import VetPortal from "./components/portals/VetPortal";
import AllPetProfile from "./components/Animal_Management/Pet_Profile/petProfile";
import AddPetProfile from "./components/Animal_Management/Pet_Profile/AddPetProfile";
import UpdatePetProfile from "./components/Animal_Management/Pet_Profile/UpdatePetProfile";
import ProfilePage from "./components/Animal_Management/Pet_Profile/ProfilePage";
import HealthProfile from "./components/Animal_Management/Health_Profile/HealthProfile";
import AddHealth from "./components/Animal_Management/Health_Profile/AddHealth";
import DisplayHealth from "./components/Animal_Management/Health_Profile/DisplayHealth";
import Addvac from "./components/Animal_Management/Health_Profile/Addvac";
import AdoptPet from "./components/adoptPetPage/AdoptPet";
import UpdateVac from "./components/Animal_Management/Health_Profile/UpdateVac";
import Dashboard from "./components/Animal_Management/Dashboard/Dashboard";
import Shelterpets from "./components/Animal_Management/Pet_Profile/ShelterPets";
import Breed from "./components/Animal_Management/Pet_Profile/Breed";
import Footer from "./components/common/Footer";
import ShelterPet from "./components/User/ShelterPet";
import UserPortal from "./components/User/UserProtal";
import Booking from "./components/User/myBooking";
import Events from "./components/User/Events";
import Pets from "./components/User/myPets";
import Profile from "./components/User/myProfile";
import PortalHandler from "./components/PortalHandler";
import Spinner from "./components/common/Spinner";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          {/* <Header /> */}
          <Routes>
              <Route path="/" element={<PortalHandler />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="shelterpet" element={<ShelterPet />} />
              <Route path="adoptpet" element={<AdoptPet />} />
              <Route path="user" element={<UserPortal />} />
              <Route path="profile" element={<Profile />} />
              <Route path="booking" element={<Booking />} />
              <Route path="pets" element={<Pets />} />
              <Route path="events" element={<Events />} />
              <Route path="test" element={<Spinner />} />
              <Route path="petprofile" element={<VetPortal />}>
              <Route path="updatepet/:id" element={<UpdatePetProfile />} />
              <Route path="allpetprofile" element={<AllPetProfile />} />
              <Route path="addpet" element={<AddPetProfile />} />
              <Route path="addhealthprofile" element={<AddHealth />} />
              <Route path="profilepage/:id" element={<ProfilePage />} />
              <Route path="healthprofile" element={<HealthProfile />} />
              <Route path="displayhealth/:id" element={<DisplayHealth />} />
              <Route path="addvac/:id/:state" element={<Addvac />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="spets" element={<Shelterpets />} />
              <Route path="breed" element={<Breed />} />
              <Route path="upvac/:id/:index/:state" element={<UpdateVac />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
