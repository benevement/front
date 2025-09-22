
const NotificationMsTest = () => {

    return (
        <>
            <div className="container mx-auto">
                <h1>Page de test pour déclencher des notifs</h1>
                <h2>simulation de déclenchement d'envoi des notifications :</h2>
                <div>
                    <p className="my-5 font-black">Notifications "Evènements"</p>
                    <ul className="list-disc">
                        <li>
                            Création d'un évènement : [EVENT_CREATED]
                        </li>
                        <li>
                            Modification d'un évènement : [EVENT_UPDATED]
                        </li>
                        <li>
                            Annulation d'un évènement : [EVENT_CANCELED]
                        </li>
                        <li>
                            Invitation pour assister à un évènement : [EVENT_NEW]
                        </li>
                        <li>
                            participation validée pour un évènement : [EVENT_VALIDATE]
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="my-5 font-black">Notifications "Tâches"</p>
                    <ul className="list-disc">
                        <li>
                            Création d'une tâche : [TASK_CREATED]
                        </li>
                        <li>
                            Suppression d'une tâche : [TASK_DELETED]
                        </li>
                        <li>
                            Notifier un volontaire pour une tâche affectée : [TASK_NEW]
                        </li>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default NotificationMsTest;