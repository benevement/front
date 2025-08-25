import { create } from "zustand/react";
import UserInterface from "../interfaces/IUser";
import {persist} from "zustand/middleware"; 
import {agecalc} from "../services/UserService";

type UserStoreType = Omit<UserInterface, "password">;


interface IUserStoreState {
  // State
  user: UserStoreType;
  connection_date: Date;

  // Setters
  setUser: (user: UserStoreType) => void;
  setConnection_date: (connection_date: Date) => void; 
  getAge: () => number;
}

export const useAuthStore2 = create<IUserStoreState>()(
  persist(
    (set, get) => ({
      // état initial
      user: { id: 999, first_name: "", last_name: "", birthdate: "2000-01-01", email: "a.b@c.com", phone_number: "01.02.03.04.05", role: "visitor" },         
         connection_date: new Date(),
    
          // setters
          setUser: (user) => set({ user }),
          setConnection_date: (connection_date) => set((state) => ({ connection_date: {...state.connection_date, connection_date}})),
          getAge: () => agecalc(new Date(get().user.birthdate)),
    }),
    { name: 'user storage',}, // nom unique pour le stockage
  )  
);

// avec getAge, l'age n'est pas directement stockée dans le store (comme c'est persistant, l'âge 1 jour + tard pourrait être différent)
// l'âge est calculé à la volée, à chaque accès au store.


//  age: agecalc(new Date(user.birthdate)) // recalcule l'age quand le user change.
