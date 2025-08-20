import { Link, NavLink } from "react-router-dom"


const Homepage = () => {
  return (
    <>
      <div className="text-amber-700">
      <h1>Homepage</h1>
      </div>
      <div>
        <h2>Quelques liens en dur pour le moment :</h2>
      </div>
      <div className="mb-10 pb-10 leading-10">
      <ul className="list-disc m-3 pl-3">
        <li>
          <Link to="/users/89" className="activeLink px-3 bg-blue-200/50 hover:underline">Ecran "Profil utilisateur"</Link>
        </li>
        <li>
          <Link to="/events/3/tasks" className="activeLink px-3 bg-blue-200/50 hover:underline">Ecran "Tasks" pour un bénévole</Link>
        </li>
        <li>
          <Link to="/signin" className="activeLink px-3 bg-blue-200/50 hover:underline">User LOGIN (signin)</Link>
        </li>
        <li>
          <Link to="/signup" className="activeLink px-3 bg-blue-200/50 hover:underline">Enregistrement Utilisateur (register/signup)</Link>
        </li>
        <li>
          <Link to="/formtest" className="activeLink px-3 bg-blue-200/50 hover:underline">formtest</Link>
        </li>
      </ul>
      </div>
    </>
  )
}

export default Homepage