import { TaskListType } from "../../interfaces/ITasks"


// composant enfant de <VolunteerTask />, permettant l'affichage d'une liste de tâches affecté à 1 user et à 1 event.
const VolunteerTaskLine = (props: TaskListType) => {

//fakeUser_Task : table de jointure task/user

    return (
        <>
        <ul className="list-disc mx-3">
        <li>
            <span className="font-bold">{props.name}</span>
            <p className="text-sm">{props.description}</p>
            {/* {mytask} */}
        </li>
        </ul>
        </>
    )
}

export default VolunteerTaskLine;
