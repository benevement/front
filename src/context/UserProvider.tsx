import { createContext, useState } from "react";
import { UserAddressInterface } from "../interfaces/IUser";

export const UserContext = createContext("");

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAddressInterface | undefined>(undefined);
  if (user) {
    const isConnectedUser = user.role == "connected_user" ? true : false;
    const isVolunteer = user.role == "volunteer" ? true : false;
    const isAdmin = user.role == "admin" ? true : false;

    if (!isConnectedUser && !isAdmin && !isVolunteer) user.role = "visitor";

    // à adapter pour récupérer l'objet "user" connecté :
    const login = async (data: { email: string; password: string }) => {
      try {
        const response = await axios.post("https://fake_api_endpoint/sign_in", data);

        const receivedData = response.data;
        console.log("Received data : ", receivedData);
      } catch (error) {
        console.log("catch error UserProvider");
      }
    };
  }
  return (
    <UserContext.Provider value={{ user, isConnectedUser, isVolunteer, isAdmin }}>{children}</UserContext.Provider>
  );
};
