//import { IEvents } from "./IEvents";
//import UserInterface from "./IUser";
import IUser from "./IUser";
import { DateString } from "./types";


export type EventStatusType = 'created'|'published'|'canceled'|'finished'

export interface ITasks  {
    id: number;
    name: string;
    description: string;
    start_date: DateString;
    end_date: DateString;
    created_at: DateString;
    updated_at?: DateString;
    event_id?: number;
    address_id: number; 
    created_by_id?: number;    
    // event?: IEvents;
    // user?: UserInterface;
}

// interface mêlant tâche et user
export interface IUserTask extends ITasks{
    //user_id: Pick<IUser, 'id'>;
    user_id: number; //TODO: sera à récupérer à partir du store user.
 }

 
// type permettant de définir les props d'un composant VolunteerTaskLine : 
export type TaskListType = Pick<IUserTask, 'name'|'description'|'start_date'|'end_date'|'id'|'user_id'>;
