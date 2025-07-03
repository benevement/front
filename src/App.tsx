import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/Homepage'
  import SignIn from './components/SignIn'
  import Navbar from './components/Navbar'
import UserProfile from './components/connectedUser/UserProfile'

function App() {

// Pour UserProfile : mettre un path avec user/{id}

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/navbar' element={<Navbar />} />
          <Route path='/users/1' element={<UserProfile />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
