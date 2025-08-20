import { DateString } from "./types";

export type EventStatusType = 'created'|'published'|'canceled'|'finished'


// permet de représenter le typage pour les champs de la table "event"

export interface IEvents  {
    id: number;
    name: string;
    description: string;
    event_date: DateString;
    max_participants: number;
    end_invitation_date: DateString;
    status: EventStatusType;
    created_at: DateString;
    updated_at?: DateString;
    // address?: AddressInterface;
    // user?: UserInterface; 
    address_id?: number;
    created_by_id?: number;    
}
