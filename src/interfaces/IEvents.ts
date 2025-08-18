import { AddressInterface } from "./IAddress";
import UserInterface from "./IUser";
import { DateString } from "./types";

export type EventStatusType = 'created'|'published'|'canceled'|'finished'

export interface IEvents  {
    id: number;
    name: string;
    description: string;
    event_date: Date;
    max_participants: number;
    end_invitation_date: Date;
    status: EventStatusType;
    created_at: DateString;
    updated_at?: DateString;
    // address?: AddressInterface;
    // user?: UserInterface; 
    address_id?: number;
    created_by_id?: number;    
}
