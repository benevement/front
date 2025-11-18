// composant pour la gestion des types de Notification
import { useEffect, useState } from "react";
import NotificationService from "../../services/NotificationService";

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
type Props = {
    toParent: () => void;
}

const NotificationTypeAdm = ({toParent}: Props) => {

    const [newNotifType,setNewNotifType] = useState<string>("")

    const handleSub1 = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Dans handleSubmit");
        NotificationService.putDataInMsDb(newNotifType);
        NotificationService.fetchDataInMsDb();
    }

    useEffect (() => {
        toParent();
    },[newNotifType])

    // sera à placer en ProtectedRoute, role=admin

    // shéma de validation ZOD

    /*
    const notifTypeSchema = z.object({
        type: z.string().max(35, "Moins de 35 caractères SVP")
    }).refine((data) => data.type != dataInDB.type)
    */
    return (
        <>
            <div className="container mx-2 max-w-3/4">
                <h1> nouveau type de notification</h1>
                <form onSubmit={handleSub1}>
                    <div className="grid grid-cols-3 gap:2 py-2">
                        <label htmlFor="notiftypeid" className="text-slate-800 min-h-8 text-center">Type : </label>
                        <input id="notiftypeid" name="notiftype" type="text"
                         className="bg-amber-50 border-2 border-amber-600"
                         onChange={(evt) => setNewNotifType(evt.target.value)}
                         />
                        <button type="submit" className="bg-blue-200 hover:bg-blue-300"> Ajouter </button>                        
                    </div>
                </form>
            </div>
        </>
    )
    // WORK IN PROGRESS


}
export default NotificationTypeAdm;
