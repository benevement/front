import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/Homepage'
  import SignIn from './components/SignIn'
  import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import UserProfile from './components/connectedUser/UserProfile'

function App() {

// Pour UserProfile : mettre un path avec user/{id}

// sélection de la route en fonction du rôle => se réfère au contexte UserContext / UserProvider



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/navbar' element={<Navbar />} />
          <Route path='/users/:id' element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
