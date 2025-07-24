import { AddressInterface } from "./IAdress";

export interface IEvent {
  name: string;
  description: string;
  address: AddressInterface
  date: string;
  volunteers_needed: number
  invitedVolunteers: number[]
}
