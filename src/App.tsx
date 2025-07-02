import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/Homepage'
import SignIn from './components/SignIn'
import Navbar from './components/Navbar'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/navbar' element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
