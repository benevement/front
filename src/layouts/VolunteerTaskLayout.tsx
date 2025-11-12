import { Navigate, Outlet } from "react-router";
import VolunteerTask from "../components/volunteer/VolunteerTask";
import VolunteerTaskLine from "../components/volunteer/VolunteerTaskLine";
import EventDetailsView from "../components/Events/EventsDetails";

/*

Layout composée de 2 parties : Event_ et Tasks
Pour la partie Tasks : composant <VolunteerTask> parent de <VolunteerTaskLine>

*/

const DefaultLayout = () => {

    //const user = {token: true}

    return (
        <>

            <header className="text-emerald-800"><h1>DefaultLayout HEADER</h1></header>

            {/* {user.token ? <Outlet/> : <Navigate to="/signin" />} */}
            {/* <Outlet/> */}
            <div className="bg-amber-200">
                <h2>Event Part</h2>
                <EventDetailsView />                
            </div>
            <div>
                <h2>TaskPart</h2>
                <div className="container flex gap-2 bg-cyan-300">
                    <VolunteerTask />
                    {/* <VolunteerTask /> fait appel à son enfant <VolunteerTaskLine /> */}
                </div>
        
            </div >
            <footer className="text-emerald-800"><h1>DefaultLayout FOOTER</h1></footer>

        </>
    )
}

export default DefaultLayout;