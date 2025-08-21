import { AddressInterface } from "./IAdress";

export interface IUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  adress: AddressInterface;
  phone_number?: string;
}
