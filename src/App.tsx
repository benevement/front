import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './components/Homepage'
import SignIn from './components/SignIn'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import EventForm from './components/Events/EventForm'
import EventDetails from './components/Events/EventsDetails'

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
  )
}

export default App
