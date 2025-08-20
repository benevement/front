import { useParams } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { fakeEvents } from "../../data/fakeEvents";
import { fakeTasks } from "../../data/fakeTasks";
import VolunteerTaskLine from "./VolunteerTaskLine";
import { fakeAddress } from "../../data/fakeAddress";
import { fakeUser_task } from "../../data/fakeUser_task";
import { ITasks } from "../../interfaces/ITasks";
import { user_taskType } from "../../interfaces/types";

const VolunteerTask = () => {
    // endpoints : 
    // endpoint côté gauche : GET /events/{event_id}
    // endpoint côté droit : GET /events/{event_id}/tasks

    // variables d'authentifications tirées du store
    const role = useAuthStore((state) => (state.user?.role));
    const token = useAuthStore((state) => (state.token));

    const isVolunteer = role && role == "volunteer" ? true : false;

    // récupération des paramètres de l'URL :
    const { url_event_id } = useParams();
    

    // TODO: typage typescript
    // TODO: obtenir les infos à partir du Back après le SignIn (puis du user Store dans React) au lieu de passer par l'url ?

    // l'évènement correspond à l'event_id dans l'url - ex : http://localhost:5173/events/1/tasks
    const event = fakeEvents.find((e) => (e.id === Number(url_event_id)))
    //console.log("event : ",event);
    // son adresse peut être récupérée à partir de la clé address_id
    const event_address = fakeAddress.find((a) => (a.id === event?.address_id));

    // Dans la table des tasks, on récupère les tâches qui correspondent à l'event ID de la Route : 
    // <Route path='/events/:event_id/tasks' element={<VolunteerTask />} />
    const eventTasks = fakeTasks.filter((task) => (task.event_id === Number(url_event_id)));
    //console.log("eventTasks : ", eventTasks);
    const uid = 89; // user_id en dur 
    // dans la table de jointure, on sélectionne toutes les tâches attribuées à l'utilisateur
    const userTasks = fakeUser_task.filter((item) => (item.user_id===uid));
    //console.log("userTasks : ", userTasks);
    

    //fonction pour retourner un tableau des tâches correspondant à 1 event et 1 user (utilise les données de la table de jointure)
function selectUserTasks(eventTaskArr: ITasks[], userTaskArr: user_taskType[]){
    const tempArr = [];
    for (let taskObj of eventTaskArr){
        if (taskObj.hasOwnProperty('id')) {
            for (let line of userTaskArr){
                if (taskObj.id===line.task_id){
                    tempArr.push(taskObj);
                }
        } }
        }
        //console.log("tempArr : ",tempArr);
    return tempArr;
    }


    // TODO: typer userTaskList
    //TODO: créer un store pour le user pour conserver localement ses données, et pouvoir récupérer son user_id
    const tasks = selectUserTasks(eventTasks, userTasks);

    // console.log
    console.log(`event_id : ${url_event_id}`);
    tasks.forEach((t,idx) => console.log(`TACHE ${idx} : ${t.name}`));

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border-2 border-blue-400">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 border-amber-100">
                    {/* <section id="sectionLeft" className="grid sm:grid-cols-[40%,60%] h-max bg-amber-400"> */}
                    {/* col-span-2 max-sm:-col-end-2  */}
                    <div className="bg-cyan-400/10 h-10">HEADER</div>
                    <div className="grid grid-cols-5 gap-x-3 bg-neutral-50 h-96">
                        <div className="px-2 col-span-2 bg-red-0 text-sm">
                            <p className="font-black mt-2 mb-2">{event?.name.toUpperCase()}</p>
                            <div className="border-2 border-stone-400 rounded-xl p-2">
                                <ul>
                                    <li>
                                        {event_address?.street_number}, {event_address?.street_name}
                                    </li>
                                    <li>
                                        {event_address?.zip_code} {event_address?.city}
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-2 px-2">
                                {event?.event_date ? `Prévu le : ${event?.event_date}` : ""}
                            </div>
                            <div className="mt-2 mb-2 px-2">
                                Status : {event?.status}
                            </div>
                            <div className="border-2 border-stone-400 rounded-xl p-2">
                                {event?.description}
                            </div>
                        </div>

                        <div className="px-2 col-span-3  bg-neutral-200">
                            <h2 className="leading-7">Tâches :</h2>
                            <hr /><br />
                            {
                                tasks.length > 0 && tasks.map((t, index) => (
                                    <VolunteerTaskLine key={index} name={t.name} description={t.description} start_date={t.start_date} end_date={t.end_date} id={t.id} user_id={uid} />
                                ))
                            }


                        </div>
                    </div>
                    <div className="bg-cyan-400/10 h-10">FOOTER</div>
                    {/* </section> */}


                </div>
            </div>


        </>
    )

}

export default VolunteerTask;
