import { AddressInterface } from "./IAddress";

export type roleType =  "admin" | "volunteer" | "connected_user" | "visitor"; 

export interface UserSignInInterface {
    email: string;
    password: string;
}
export interface UserSignupInterface extends UserSignInInterface{
    confirmPassword?: string;
    phone_number?: string;
}
export default interface UserInterface extends UserSignInInterface, UserSignupInterface {
    id: number;
    first_name: string; // prenom
    last_name: string; // nom
    birthdate: string;
    avatar?: string; // URL de la photo utilisateur
    role: roleType;
}

export interface UserAddressInterface extends UserInterface, AddressInterface {
  // réunion des interfaces AddressInterface et UserInterface (pour utilisation dans écran UserProfile)
}

export interface UserInterfaceBdd extends UserInterface{
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAuthState {
    user: { email: string; role: roleType } | null;
    //user : Pick<UserInterface, "email"|"role"> | null     // autre écriture possible
    token: string | null;
    setAuth: (user: IAuthState['user'], token: string) => void;
    logout: () => void;
  }

export interface IUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: roleType;
  adress: AddressInterface;
  phone_number?: string;
}




/*
`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(90) NOT NULL,
  `last_name` VARCHAR(90) NOT NULL,
  `birthdate` DATE NULL,
  `email` VARCHAR(320) NOT NULL,
  `password` VARCHAR(250) NULL,
  `phone_number` VARCHAR(25) NULL,
  `role` ENUM('admin', 'volunteer', 'connected_user', 'visitor') NOT NULL DEFAULT 'visitor',
  `created_at` DATETIME NULL DEFAULT now(),
  `updated_at` DATETIME NULL DEFAULT now(),
  */