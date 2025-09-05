import { roleType } from '../interfaces/IUser';

// Pages visiteurs
/* import HomePageLiens from "../pages/HomePageLiens";
 */

import SignIn from "../components/Connexion/SignIn";
import SignUp from "../components/Connexion/SignUp";
import Forbidden from "../pages/Forbidden";

// Pages connectées
import EventForm from "../components/Events/EventForm";
import EventDetails from "../components/Events/EventsDetails";
import EventsList from '../components/Events/EventsList';
import UserProfile from "../components/connectedUser/UserProfile";
import VolunteerTask from "../components/volunteer/VolunteerTask";
import FormTest from "../pages/FormTest";

// Pages rôles supérieurs
/* import Dashboard from "./pages/Dashboard";
import ManagerPanel from "./pages/ManagerPanel";
import AdminPanel from "./pages/AdminPanel"; */
import GestionRoles from '../components/admin/GestionRoles';
import RefreshTest from './test-refresh';
import TokenStatus from './tokenStatus';
import Homepage from '../pages/Homepage';

  const allRoles: roleType[] = ["connected_user", "volunteer", "admin"];
  const eventMembersRoles: roleType[] = ["volunteer", "admin"]
  const adminRole: roleType[] = ["admin"];

export const routesConfig = [


  // Pages accessibles aux visiteurs
/*   { path: "/", element: <HomePageLiens />, allowVisitor: true },
 */
  { path: "/", element: <Homepage/>,  allowVisitor: true},
  { path: "/signin", element: <SignIn />, allowVisitor: true },
  { path: "/signup", element: <SignUp />, allowVisitor: true },
  { path: "/test-refresh", element: <RefreshTest />, allowVisitor: true },
  { path: "/tokenStatus", element: <TokenStatus />, allowVisitor: true },


  // Pages réservées aux utilisateurs connectés
  { path: "/events/new", element: <EventForm />, allowedRoles: adminRole  },
  { path: "/events", element: <EventsList />, allowedRoles: allRoles  },
  { path: "/events/:id/edit", element: <EventForm />, allowedRoles: adminRole  },
  { path: "/events/:id/", element: <EventDetails />, allowedRoles: allRoles  },
  { path: "/users/:id", element: <UserProfile />, allowedRoles: allRoles  },
  { path: "/events/:url_event_id/tasks", element: <VolunteerTask />, allowedRoles: eventMembersRoles },
  { path: "/formtest", element: <FormTest />, allowedRoles: allRoles },

  // Pages réservées aux rôles supérieurs
/*   { path: "/dashboard", element: <Dashboard />, allowedRoles: ["connected_user", "manager", "admin"] },
  { path: "/manager", element: <ManagerPanel />, allowedRoles: ["manager", "admin"] },
  { path: "/admin", element: <AdminPanel />, allowedRoles: ["admin"] }, */
  { path: "/admin/manage_roles", element: <GestionRoles />, allowedRoles: adminRole },

  // Page d'accès refusé
  { path: "/forbidden", element: <Forbidden />, allowVisitor: true },
];
