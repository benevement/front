import { createContext, useState } from "react";
import UserInterface from "../interfaces/IUser";
import fakeUsers from "../data/fakeUsers";

export type ProviderUserType = {
  providerUser: UserInterface;
  isConnectedUser: boolean;
  isVolunteer: boolean;
  isAdmin: boolean;
  defineUser?: (u: UserInterface) => void;
};

export const UserContext = createContext<ProviderUserType | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userC, setUserC] = useState<ProviderUserType | undefined>(undefined);

  const fakeUser = fakeUsers.find((u: UserInterface) => u.id === 89);

  function defineUser(u: ProviderUserType) {
    setUserC(u);
    console.log("defineUser() in UserProvider.tsx - u: ", u);
  }

  if (fakeUser) {
    const isConnectedUser = fakeUser.role === "connected_user";
    const isVolunteer = fakeUser.role === "volunteer";
    const isAdmin = fakeUser.role === "admin";

    const providerUser: ProviderUserType = {
      providerUser: fakeUser,
      isConnectedUser,
      isVolunteer,
      isAdmin,
    };

    return (
      <UserContext.Provider value={providerUser}>
        {children}
      </UserContext.Provider>
    );
  }

  if (userC) {
    if (!userC.isConnectedUser && !userC.isAdmin && !userC.isVolunteer) {
      userC.providerUser.role = "visitor";
      console.log("In UserProvider - userC : ", userC);
    }
  }

  return (
    <UserContext.Provider value={{...userC, defineUser} as ProviderUserType}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
