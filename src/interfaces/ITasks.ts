import { IEvents } from "./IEvents";
import UserInterface from "./IUser";
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
    // event?: IEvents;
    // user?: UserInterface;
    address_id: number; 
    event_id: number;
    created_by_id: number;    
}
