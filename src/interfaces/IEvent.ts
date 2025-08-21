import { AddressInterface } from "./IAdress";

export interface IEvent {
  id: number;
  name: string;
  description: string;
  address: AddressInterface;
  date: string;
  volunteers_needed: number;
  invitedVolunteers: number[];
  creatorId: number;
  status: string;
}
