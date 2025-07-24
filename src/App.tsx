import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './components/Homepage'
import SignIn from './components/SignIn'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import CreateEventForm from './components/Events/CreateEvent'

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
          <Route path='/events/create' element={<CreateEventForm/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
