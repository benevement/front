export interface INotification {
    id: number,
    title: string,
    content: string,   
    created_at: Date,
    updated_at?: Date,
    notification_type_id: number    // en ref à id de la table Notification_type
}

// liste tous les types de notifications (table utilisée un peu comme une enum modifiable)
export interface INotification_type {
    id: number,
    type: string
}


// table de liaison User <===> Notification 
export interface IUser_notification {
    user_id: number,
    notification_id: number
}


/*
NOTIFICATION_TYPE type (data in table) :

Event_published  
Event_invitation
Task_created
Task_endedz
Feedback_sent_admin
Feedback_sent_volunteer'
*/
