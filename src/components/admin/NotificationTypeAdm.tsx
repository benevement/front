// composant pour la gestion des types de Notification

import z from "zod";
import api from "../../services/api";

/*
NOTIFICATION_TYPE type (data in table) :

Event_published  
Event_invitation
Event_canceled
Event_updated
Event_validated
Task_created
Task_assigned
Task_ended
Task_deleted
Feedback_sent_admin
Feedback_sent_volunteer'

*/

const NotificationTypeAdm = () =>{

const recDataInDB = async() => {
//    const axiosGetType = await api.get()
}

// sera à placer en ProtectedRoute, role=admin

// shéma de validation ZOD

/*
const notifTypeSchema = z.object({
    type: z.string().max(35, "Moins de 35 caractères SVP")
}).refine((data) => data.type != dataInDB.type)


*/

// WORK IN PROGRESS


}
export default NotificationTypeAdm;
