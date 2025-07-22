import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import SignIn from './components/SignIn'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'

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

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
