import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EventForm from './components/Events/EventForm'
import EventDetails from './components/Events/EventsDetails'
import Homepage from './pages/HomePageLiens'
import SignIn from './components/SignIn'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import UserProfile from './components/connectedUser/UserProfile'
import VolunteerTask from './components/volunteer/VolunteerTask'
import FormTest from './pages/FormTest'
import HomePageLiens from './pages/HomePageLiens'
// import FakeUserComp from './components/common/FakeUserComp'


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Homepage />} />
        <Route path='/liens' element={<HomePageLiens />} />     {/*temporaire */}
        
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/navbar' element={<Navbar />} />

        <Route path="/events/new" element={<EventForm />} />
        <Route path="/events/:id/edit" element={<EventForm />} />
        <Route path="/events/:id/" element={<EventDetails />} />
        
        <Route path='/users/:id' element={<UserProfile />} />
        <Route path='/events/:url_event_id/tasks' element={<VolunteerTask />} />
        <Route path='/formtest' element={<FormTest />} />
        {/* <Route path='/users/fake/' element={<FakeUserComp />} /> */}

      </Routes>
    </BrowserRouter>
  )


}
export default App;
