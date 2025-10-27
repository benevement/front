import { useEffect, useState } from "react";
import NotificationTypeAdm from "../components/admin/NotificationTypeAdm";
import { INotification_type } from "../interfaces/INotification";
import NotificationService from "../services/NotificationService";
import { IUser } from "../interfaces/IUser";
import api from "../services/api";
import UserService from "../services/UserService";


interface IPropsNotif {
    notiftype: string;
}

const NotificationMsTest = () => { // { notiftype }: IPropsNotif

    const styleStr = "text-white bg-cyan-600 border-2 p-2 m-2 rounded-xl text-center hover:bg-cyan-500 cursor-pointer h-fit "
    //const [notifTypeList, setNotifTypeList] = useState<Promise<INotification_type[]>>(); 
    const [notifTypeList, setNotifTypeList] = useState<INotification_type[]>();
    const [userList, setUserList] = useState<IUser[]>();
    const [limit, setLimit] = useState<number>(3);
    const [lastNotif, setLastNotif] = useState<INotification_type>();
    const us = new UserService();

    useEffect(() => {
        const listing = async () => {
            setNotifTypeList(await NotificationService.fetchDataInMsDb());
        }
        listing();

        //setNotifTypeList(NotificationService.fetchDataInMsDb());
    }, [notifTypeList])


    function handleInParent() {
        console.log("Dans le parent")
    }

    useEffect(() => {   // LAST NOTIF
        const fetchLastNotif = async () => {
            console.log("fetchLastNotif, NotificationMsTest.tsx")
            const lastNotif = await NotificationService.getLastNotif();
            if (!lastNotif) throw new Error("Impossible de récupérer la dernière notification")
            setLastNotif(lastNotif);
        }
        fetchLastNotif();
    }, [])

    useEffect(() => {   // GET ALL USERS
        const fetchAllUsers = async () => {
            const allUsers = await us.getUsers()
            console.log("** T1 **")
            setUserList(allUsers);
        }
        fetchAllUsers();
    }, [])

    return (
        <>
            <div className="container mx-5">
                <h1>Page de test pour déclencher des notifs</h1>
                <h2>simulation de déclenchement d'envoi des notifications :</h2>

                <div>
                    <p className="text-sm text-green-800">Last_notif : {JSON.stringify(lastNotif) || ""}</p>
                    <p className="my-5 font-black">Liste des notifications d'un User</p>
                    <ul className="list-disc">
                        <li>
                            notifications : [Notifications par User]
                        </li>
                        <select id="userId" name="selUser" required>
                            {userList?.map((u) => `<option value=${u.first_name} ${u.last_name}></option>`)}
                        </select>
                        <button type="button" className={styleStr}>User notifs</button>
                    </ul>

                    <p className="my-5 font-black">Notifications "Evènements"</p>
                    <ul className="list-disc">
                        <li>
                            Publication d'un évènement : [EVENT_PUBLISHED]
                        </li>
                        <button type="button" className={styleStr}>EVENT_PUBLISHED</button>
                        <li>
                            Modification d'un évènement : [EVENT_UPDATED]
                        </li>
                        <button type="button" className={styleStr}>EVENT_UPDATED</button>
                        <li>
                            Annulation d'un évènement : [EVENT_CANCELED]
                        </li>
                        <button type="button" className={styleStr}>EVENT_CANCELED</button>
                        <li>
                            Invitation pour assister à un évènement : [EVENT_INVITATION]
                        </li>
                        <button type="button" className={styleStr}>EVENT_INVITATION</button>
                        <li>
                            participation validée pour un évènement : [EVENT_VALIDATED]
                        </li>
                        <button type="button" className={styleStr}>EVENT_VALIDATED</button>
                    </ul>
                </div>

                <div>
                    <p className="my-5 font-black">Notifications "Tâches"</p>
                    <ul className="list-disc">
                        <li>
                            Création d'une tâche : [TASK_CREATED]
                        </li>
                        <button type="button" className={styleStr}>TASK_CREATED</button>
                        <li>
                            Suppression d'une tâche : [TASK_DELETED]
                        </li>
                        <button type="button" className={styleStr}>TASK_DELETED</button>
                        <li>
                            Notifier un volontaire pour une tâche affectée : [TASK_NEW]
                        </li>
                        <button type="button" className={styleStr}>TASK_NEW</button>
                    </ul>
                </div>

            </div>
            <div className="mx-2">
                <h2>Liste des types de notifs :</h2>

            </div>
            <NotificationTypeAdm toParent={handleInParent} />
            {notifTypeList && notifTypeList.length > 0 && notifTypeList.map((item, index) => {
                console.log(item);
                <p>{item.id} : {item.type}</p>
            })}
        </>
    )
}



export default NotificationMsTest;

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