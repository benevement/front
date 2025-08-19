import { Link } from "react-router-dom"


const Homepage = () => {
  return (
    <>
      <div className="text-amber-700">
      <h1>Homepage</h1>
      </div>
      <div>
        <h2>Quelques liens en dur pour le moment :</h2>
      </div>
      <ul className="list-disc m-3 pl-3">
        <li>
          <Link to="/users/89">Ecran "Profil utilisateur"</Link>
        </li>
        <li>
          <Link to="/events/3/tasks">Ecran "Tasks" pour un bénévole</Link>
        </li>
      </ul>
    </>
  )
}

export default Homepage