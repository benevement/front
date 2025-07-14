import { createContext, useEffect, useState } from "react";
//import { UserAddressInterface} from "../interfaces/IUser";
import UserInterface from "../interfaces/IUser";
import fakeUsers from "../data/fakeUsers";
//import axios from "axios";


export type ProviderUserType = {
  providerUser: UserInterface;
  //defineUser?: (u: ProviderUserType) => void; // fonction pour redéfinir le user dans le context
  defineUser?: (u: UserInterface) => void; // fonction pour redéfinir le user dans le context
  isConnectedUser: boolean;
  isVolunteer: boolean;
  isAdmin: boolean;
}

// contexte permettant de partager globalement l'objet "user" connecté, avec son role.
// lavariable exportée dans le contexte est : userC
export const UserContext = createContext<ProviderUserType | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [userC, setUserC] = useState<ProviderUserType | undefined>(undefined);
  const fetchUser = async () => {
    //const 
  }

  // pour test : user => fakeUser "en dur"
  const fakeUser = fakeUsers.find((u: UserInterface) => (u.id == 89));
  console.log("fakeUser :", fakeUser)

  //function defineUser(u: ProviderUserType){ // fonction pour redéfinir le user dans le context
  function defineUser(u: UserInterface){ // fonction pour redéfinir le user dans le context
    const isConnectedUser = u.role == "connected_user" ? true : false;
    const isVolunteer = u.role == "volunteer" ? true : false;
    const isAdmin = u.role == "admin" ? true : false;
    setUserC({providerUser: u, isConnectedUser, isAdmin, isVolunteer});
    console.log("defineUser() in UserProvider.tsx - u: ",u );
  }



    useEffect(() => {
      if (fakeUser) { 
        defineUser(fakeUser);
      }
      //setUserC({ providerUser: fakeUser, isConnectedUser, isVolunteer, isAdmin })
    },[fakeUser] );

  
  if (userC) {
    if (!userC.isConnectedUser && !userC.isAdmin && !userC.isVolunteer) userC.providerUser.role = "visitor";
      console.log("In UserProvider - userC : ", userC)

  } // end if(user)
  else {
    console.log ("userC n'existe pas.");
    fakeUser && defineUser(fakeUser);
  }

  return (
    <UserContext.Provider value={userC}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
