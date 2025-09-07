import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './router/ProtectedRouted'
import { routesConfig } from './router/routesConfig'
import Navbar from './components/Partials/Navbar'
import Footer from './components/Partials/Footer'
import { useRestoreSession } from './services/UserService';
import Sidebar from './components/Partials/Sidebar'
import { useState } from "react";

function App() {
  useRestoreSession()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCloseSidebar = () => setIsSidebarOpen(false);
  return (
    <BrowserRouter>
      <div>
          <div>
            <Navbar onClose={handleCloseSidebar} onToggleMenu={handleToggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
          </div>
        <Routes>
          {routesConfig.map(({ path, element, allowedRoles, allowVisitor }) => (
            <Route
              key={path}
              element={<ProtectedRoute allowedRoles={allowedRoles} allowVisitor={allowVisitor} />}
            >
              <Route path={path} element={element} />
            </Route>
          ))}

        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  )


}
export default App;
