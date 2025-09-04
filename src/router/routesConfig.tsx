import { roleType } from '../interfaces/IUser';

// Pages visiteurs
import Homepage from '../pages/Homepage';
import HomePageLiens from "../pages/HomePageLiens";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Forbidden from "../pages/Forbidden";

// Pages connectées
import Navbar from "../components/Navbar";
import EventForm from "../components/Events/EventForm";
import EventDetails from "../components/Events/EventsDetails";
import UserProfile from "../components/connectedUser/UserProfile";
import VolunteerTask from "../components/volunteer/VolunteerTask";
import FormTest from "../pages/FormTest";

// Pages rôles supérieurs
/* import Dashboard from "./pages/Dashboard";
import ManagerPanel from "./pages/ManagerPanel";
import AdminPanel from "./pages/AdminPanel"; */
import GestionRoles from '../components/admin/GestionRoles';


  const allRoles: roleType[] = ["connected_user", "volunteer", "admin"];
  const eventMembersRoles: roleType[] = ["volunteer", "admin"]
  const adminRole: roleType[] = ["admin"];

export const routesConfig = [


  // Pages accessibles aux visiteurs
  { path: "/", element: <Homepage />, allowVisitor: true },
  { path: "/liens", element: <HomePageLiens />, allowVisitor: true },
  { path: "/signin", element: <SignIn />, allowVisitor: true },
  { path: "/signup", element: <SignUp />, allowVisitor: true },
  { path: "/formtest", element: <FormTest />, allowVisitor: true }, // pour tests - temporaire.

  // Pages réservées aux utilisateurs connectés
  { path: "/navbar", element: <Navbar />, allowedRoles: allRoles },
  { path: "/events/new", element: <EventForm />, allowedRoles: adminRole  },
  { path: "/events/:id/edit", element: <EventForm />, allowedRoles: adminRole  },
  { path: "/events/:id/", element: <EventDetails />, allowedRoles: adminRole  },
  { path: "/users/profile", element: <UserProfile />, allowedRoles: allRoles  },
  { path: "/events/:url_event_id/tasks", element: <VolunteerTask />, allowedRoles: eventMembersRoles },
  //{ path: "/formtest", element: <FormTest />, allowedRoles: allRoles },

  // Pages réservées aux rôles supérieurs
/*   { path: "/dashboard", element: <Dashboard />, allowedRoles: ["connected_user", "manager", "admin"] },
  { path: "/manager", element: <ManagerPanel />, allowedRoles: ["manager", "admin"] },
  { path: "/admin", element: <AdminPanel />, allowedRoles: ["admin"] }, */
  { path: "/admin/manage_roles", element: <GestionRoles />, allowedRoles: adminRole },

  // Page d'accès refusé
  { path: "/forbidden", element: <Forbidden />, allowVisitor: true },
];
