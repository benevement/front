import { roleType } from '../interfaces/IUser';

// Pages visiteurs
import HomePageLiens from "../pages/HomePageLiens";
import SignIn from "../components/Connexion/SignIn";
import SignUp from "../components/Connexion/SignUp";
import Forbidden from "../pages/Forbidden";

// Pages connectées
import EventForm from "../components/Events/EventForm";
import EventDetails from "../components/Events/EventsDetails";
import EventsList from '../components/Events/EventsList';
import UserProfile from "../components/connectedUser/UserProfile";
import VolunteerTask from "../components/volunteer/VolunteerTask"
import FormTest from "../pages/FormTest";
import Availabilities from "../components/volunteer/Availabilities";
import UserSkills from "../components/volunteer/UserSkills";

// Pages rôles supérieurs
/* import Dashboard from "./pages/Dashboard";
import ManagerPanel from "./pages/ManagerPanel";
import AdminPanel from "./pages/AdminPanel"; */
import GestionRoles from '../components/admin/GestionRoles';
import Homepage from '../pages/Homepage';
import NotificationMsTest from '../pages/NotificationMsTest';
import VolunteerTaskLayout from '../layouts/VolunteerTaskLayout';

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
  { path: "/formtest2", element: <NotificationMsTest />, allowVisitor: true }, // pour tests - temporaire.
  //{ path: "/voltask/:url_event_id/tasks", element: <VolunteerTask />, allowVisitor: true }, // pour tests - temporaire.
  { path : "/voltask", element: <VolunteerTaskLayout />, allowVisitor: true }, // TODO: allowVisitor true A changer (tests)
  //{ path: "/voltask", element: <VolunteerTask2 />, allowVisitor: true }, // pour tests - temporaire.
  { path: "/auth/google", allowVisitor: true }, // lien pour l'authentification Google OAuth2

  // Pages réservées aux utilisateurs connectés
  { path: "/events/new", element: <EventForm />, allowedRoles: adminRole  },
  { path: "/events", element: <EventsList />, allowedRoles: allRoles  },
  { path: "/events/:id/edit", element: <EventForm />, allowedRoles: adminRole  },
  { path: "/events/:id/", element: <EventDetails />, allowedRoles: allRoles  },
  { path: "/users/profile", element: <UserProfile />, allowedRoles: allRoles  }, // rev 07/09 mda
  { path: "/users/avail", element: <Availabilities />, allowedRoles: eventMembersRoles  },
  { path: "/users/skills", element: <UserSkills />, allowedRoles: eventMembersRoles  },
  { path: "/events/:url_event_id/tasks", element: <VolunteerTask />, allowedRoles: eventMembersRoles },
  
  // Pages réservées aux rôles supérieurs
/*   { path: "/dashboard", element: <Dashboard />, allowedRoles: ["connected_user", "manager", "admin"] },
  { path: "/manager", element: <ManagerPanel />, allowedRoles: ["manager", "admin"] },
  { path: "/admin", element: <AdminPanel />, allowedRoles: ["admin"] }, */
  { path: "/admin/manage_roles", element: <GestionRoles />, allowedRoles: adminRole },

  // Page d'accès refusé
  { path: "/forbidden", element: <Forbidden />, allowVisitor: true },
];
