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
import AdoptPet from './components/User/AdoptPet';
import Footer from './components/common/Footer';
import ShelterPet from './components/User/ShelterPet';
import UserPortal from './components/User/UserProtal';
import Booking from './components/User/myBooking';
import Events from './components/User/Events';
import Pets from './components/User/myPets';
import Profile from './components/User/myProfile';


import VehicleDashboard from "./components/VehicleDashboard";
import EditVehicle from "./components/EditVehicle";
import Vehicles from "./components/Vehicles";
import AddNewVehicle from "./components/AddNewVehicle";
import PendingBookings from "./components/PendingBookings";
import AddAvailability from "./components/AddAvailability";
import Availabilities from "./components/Availabilities";
import EditAvailabilities from "./components/EditAvailabilities";
import AddTBooking from "./components/AddTBooking";
import AddVehicleBudgetRequestForm from "./components/AddVehicleBudgetRequest";
import AllVBudgetRequests from "./components/AllVBudgetRequests";
import VHome from "./components/VHome";
import "react-toastify/dist/ReactToastify.css";


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
import AddEvent from "./components/EventManagement/AddEvent";
import AllEvent from "./components/EventManagement/AllEvent";
import RegisterEvent from "./components/EventManagement/RegisterEvent";
import AllRegisterEvent from "./components/EventManagement/AllRegisterEvent";
import AllEventUser from "./components/EventManagement/AllEventUser";
import EditEvent from "./components/EventManagement/EditEvent";
import AddEventFeedback from "./components/EventManagement/AddEventFeedback";
import AllEventFeedback from "./components/EventManagement/AllEventFeedback";
import EventReport from "./components/EventManagement/EventReport";
import BudgetRequestForm from "./components/EventManagement/BudgetRequestForm";
import AllEventBudget from "./components/EventManagement/AllEventBudget";
import EditBudget from "./components/EventManagement/BudgetRequestEdit";
import StockRequestForm from "./components/EventManagement/StockRequestForm";
import StockRequestEdit from "./components/EventManagement/StockRequestEdit";
import AllEventStock from "./components/EventManagement/AllEventStock";
import EventChart from "./components/EventManagement/EventChart";
import QRCodeContent from "./components/EventManagement/QRCodeContent";
import IncomeExpenseReport from "./components/EventManagement/IncomeExpenseReport";
import EventPortal from "./components/portals/EventPortal";
import EventDashboard from "./components/EventManagement/EventDashboard";
import EditBooking from "./components/EventManagement/EditBooking";

import GetTransaction from "./components/Finance_Management/GetTransaction";
import GetPayment from "./components/Finance_Management/GetPayment";
import GetDoanation from "./components/Finance_Management/GetDonation";
import GetOrganization from "./components/Finance_Management/GetOrganization";
import AddOrganization from "./components/Finance_Management/AddOrganization";
import FinaDashBoard from "./components/Finance_Management/FinaDashBoard";
import GetBooking from "./components/Finance_Management/GetBooking";
import FinaPaymentReports from "./components/Finance_Management/FinaPaymentReports";
import AddDonation from "./components/Finance_Management/AddDonations";
import FinaGetEvents from "./components/Finance_Management/FinaGetEvents";
import FinaGetVehicle from "./components/Finance_Management/FinaGetVehicle";

import {
  FinaHeader,
  FinaLeftBar,
} from "./components/Finance_Management/FinaHeader_SB";

function App() {
  return (
    <>
    <Router>
      <div className="App">
      <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="shelterpet" element={<ShelterPet />} />
            <Route path="adoptpet" element={<AdoptPet />} />
            //user
            <Route path='user' element={<UserPortal />} />
              <Route path='profile' element={<Profile />} />
              <Route path='booking' element={<Booking />} />
              <Route path='pets' element={<Pets />} />
              <Route path='events' element={<Events />} />


              <Route path='test' element={<Spinner />} />

          </Routes>
      <Footer />
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
