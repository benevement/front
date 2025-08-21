<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom'
//import './App.css'
=======
import { BrowserRouter, Route, Routes } from 'react-router-dom'
>>>>>>> 1f501829afe576b7e04be1fecf169d9fa1b6918f
import Homepage from './pages/Homepage'
import SignIn from './components/SignIn'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
<<<<<<< HEAD
import UserProfile from './components/connectedUser/UserProfile'


function App() {

  return (    
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/navbar' element={<Navbar />} />
        <Route path='/users/:id' element={<UserProfile />} />
      </Routes>
=======
import EventForm from './components/Events/EventForm'
import EventDetails from './components/Events/EventsDetails'

import './App.css'

function App() {

// Pour UserProfile : mettre un path avec user/{id}

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/navbar' element={<Navbar />} />
          <Route path="/events/new" element={<EventForm />} />
          <Route path="/events/:id/edit" element={<EventForm />} />
          <Route path="/events/:id/" element={<EventDetails />} />
        </Routes>
      </BrowserRouter>
    </>
>>>>>>> 1f501829afe576b7e04be1fecf169d9fa1b6918f
  )
}

export default App
