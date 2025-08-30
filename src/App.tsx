import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePageLiens from './pages/HomePageLiens'
// import FakeUserComp from './components/common/FakeUserComp'

import ProtectedRoute from './router/ProtectedRouted'
import { routesConfig } from './router/routesConfig'


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/liens' element={<HomePageLiens />} />     {/*temporaire */}
        {routesConfig.map(({ path, element, allowedRoles, allowVisitor }) => (
          <Route
            key={path}
            element={<ProtectedRoute allowedRoles={allowedRoles} allowVisitor={allowVisitor} />}
          >
            <Route path={path} element={element} />
          </Route>
        ))}
        {/* <Route path='/users/fake/' element={<FakeUserComp />} /> */}

      </Routes>
    </BrowserRouter>
  )


}
export default App;
