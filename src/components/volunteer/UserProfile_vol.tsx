// 14/07
// TODO : copie des autres + ajout 2 boutons
// => plutot créer 2 composants boutons à intégrer à l'autre component.

// Bouton "Modify password"
// Bouton User Skills
// Bouton Avaibility

export const VolunteerSection = () => {

    
    return (
        <>
            <div className="grid grid-cols-2 text-sm justify-around items-center space-x-2">
                <button type="button" className="custom-button col-start-1 col-end-2">
                  Compétences
                </button>
                <button type="submit" className="custom-button col-start-2 col-end-3">
                  Disponibilités
                </button>
              </div>
        </>
    )
}

