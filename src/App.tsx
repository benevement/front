import { Route, Routes } from 'react-router-dom'
//import './App.css'
import Homepage from './pages/Homepage'
import SignIn from './components/SignIn'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
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
  )
}

export default App
