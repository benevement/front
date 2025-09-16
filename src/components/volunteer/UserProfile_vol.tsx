// 14/07
// TODO : copie des autres + ajout 2 boutons
// => plutot créer 2 composants boutons à intégrer à l'autre component.

import { Link } from "react-router-dom"

// Bouton User Skills
// Bouton Avaibility

export const VolunteerSection = () => {


  return (
    <>
      <div className="container grid grid-cols-2 gap-2 text-sm">
        <div className="w-full">
          <Link to="/users/skills/" className="block w-full">
            <button type="button" className="custom-button w-full">
              Compétences
            </button>
          </Link>
        </div>
        <div className="w-full">
          <Link to="/users/avail/" className="block w-full">
            <button type="submit" className="custom-button w-full bg-fuchsia-600">
              Disponibilités
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

