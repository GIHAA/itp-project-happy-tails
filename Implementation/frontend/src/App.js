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

import AddEvent from './components/EventManagement/AddEvent';
import AllEvent from './components/EventManagement/AllEvent';
import RegisterEvent from './components/EventManagement/RegisterEvent';
import AllRegisterEvent from './components/EventManagement/AllRegisterEvent';
import AllEventUser from './components/EventManagement/AllEventUser';
import EditEvent from './components/EventManagement/EditEvent';
import AddEventFeedback from './components/EventManagement/AddEventFeedback';
import AllEventFeedback from './components/EventManagement/AllEventFeedback';
import EventReport from './components/EventManagement/EventReport';
import BudgetRequestForm from './components/EventManagement/BudgetRequestForm';
import AllEventBudget from './components/EventManagement/AllEventBudget';
import EditBudget from './components/EventManagement/BudgetRequestEdit';
import StockRequestForm from './components/EventManagement/StockRequestForm';
import StockRequestEdit from './components/EventManagement/StockRequestEdit';
import AllEventStock from './components/EventManagement/AllEventStock';
import LeftSideBar from './components/LeftSideBar'
import EventChart from './components/EventManagement/EventChart'
import QRCodeContent from './components/EventManagement/QRCodeContent'
import IncomeExpenseReport from './components/EventManagement/IncomeExpenseReport'
import EventPortal from './components/portals/EventPortal';
import EventDashboard from './components/EventManagement/EventDashboard';
import EditBooking from './components/EventManagement/EditBooking';






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



            // EventManagement
            <Route path='eventdashboard' element={<EventPortal />} >
                
                 <Route path='getEvents' element={<AllEvent />} />
                 <Route path='addEvent' element={<AddEvent />} />
                 <Route path='editEvent/:id' element={<EditEvent />} />
                 <Route path='getFeedbacks' element={<AllEventFeedback />} />
                 <Route path='budget' element={<AllEventBudget />} />
                 <Route path='editbudget/:id' element={<EditBudget />} />
                 <Route path='addBudget' element={<BudgetRequestForm />} />
                 <Route path='stock' element={<AllEventStock />} />
                 <Route path='editstock/:id' element={<StockRequestEdit />} />
                 <Route path='addStock' element={<StockRequestForm />} />
                 <Route path='eventbooking' element={<AllRegisterEvent />} />
                 <Route path='chart' element={<IncomeExpenseReport />} />
                 <Route path='dashboard' element={<EventDashboard />} />
                 <Route path='report' element={<EventReport />} />
                 <Route path='addbooking/:id' element={<RegisterEvent />} />
                 <Route path='editBooking/:id' element={<EditBooking />} />
                 <Route path='getEventsUser' element={<AllEventUser />} />
                 <Route path='addFeedback/:id' element={<AddEventFeedback />} />
            </Route>



          </Routes>
      <Footer />
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
