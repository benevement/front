// Revision : 15/09/25
// 07/07/25 : tous les leading-6 remplacés par des leading-4 => hauteur de ligne pour le texte au-dessus des champs input

import { useForm, SubmitHandler } from "react-hook-form";
<<<<<<< HEAD
import UserInterface, { UserAddressInterface } from "../../interfaces/IUser";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
//import { fakeAddress } from "../../data/fakeAddress";
import { userAddressStore, userStore } from "../../stores/userStore";
import { VolunteerSection } from "../volunteer/UserProfile_vol";
//import fakeUsers from "../../data/fakeUsers";
//import { useParams } from "react-router-dom";
import UserProfile_adm from "../admin/UserProfile_adm";
import UserService from "../../services/UserService";
import { useAuthStore } from "../../stores/useAuthStore";
import api from "../../services/api";

type UserStorageType = Omit<UserInterface, 'password'>; // TODO: doublon des types dans userStores.ts ??
type UserStorageType2 = Omit<UserAddressInterface, 'password'>;
=======
import { IUpdateProfile } from "../../interfaces/IUser";
import { useEffect, useState } from "react";
import { userAddressStore } from "../../stores/userStore";
import { VolunteerSection } from "../volunteer/UserProfile_vol";
import UserProfile_adm from "../admin/UserProfile_adm";
import UserService from "../../services/UserService";
import { useAuthStore } from "../../stores/useAuthStore";
import axios from "axios";
import { lStoreAddressData, lStoreUserData } from "../../services/api/axiosProfile";
>>>>>>> BEN-92


const UserProfile = () => {

  const us = new UserService();
  let flagUpdate: boolean = false;

  // variables d'authentifications tirées du store
<<<<<<< HEAD
  //const role = useAuthStore((state) => (state.user?.role));
  const authUserStored = useAuthStore((state) => (state.user));
  const { user } = useAuthStore();
  const setUser = userStore((state) => state.setUser)
  const setUserAddress = userAddressStore((state) => state.setUserAddress)
  const userAddress = userAddressStore((state) => state.userAddress)

  const recUserData = async () => {
    try {
      const resp = await api.get(`/users/${user?.id}`);
      console.log("resp : ", resp)
      return resp.data;
      
    }
    catch (error) {
      const axiosError = error as AxiosError;
      console.log("Erreur inconnue : ", error);
      console.log("axiosError : ", axiosError.message);
    }
  }

    const recAddressData = async () => {
    try {
      const resp2 = await api.get(`/address/${user?.id}`);
      console.log("resp2 : ", resp2)
      return resp2.data;
     
    }
    catch (error2) {
      const axiosError = error2 as AxiosError;
      console.log("Erreur inconnue : ", error2);
      console.log("axiosError : ", axiosError.message);
    }
  }


  const [userStorage, setUserStorage] = useState<UserStorageType>({
    id: 0, email: "", last_name: "", first_name: "", birthdate: "", role: "visitor"
  });
  const [userAddressStorage, setUserAddressStorage] = useState<UserStorageType2>({
    id: 0, email: "", last_name: "", first_name: "", birthdate: "", role: "visitor", user_id: 0, zip_code:"", street_number: "", street_name: "", city: ""
  });

  const assignUserStorage = async () => {
    try {
      const rud = await recUserData();
      console.log("rud : ", rud);
      const adr = await recAddressData();
      console.log("adr : ", adr);
      const rudadr = {...rud, ...adr}
      console.log("T1");
      if (rud.id != 0 && adr) {
        console.log("T2");
        //setUserStorage(rud);
         // pas de set du User dans le useState si pas de user (id=0 => valeur par défaut de userStorage)
        setUserAddressStorage(adr);
        setUser(rud); // on set le store Zustand
        setUserAddress(rudadr) // on set le store Zustand avec user complet (user + adresse)
        console.log("T2B");
      }

    }
    catch (error) {
      console.log("error : ", error);
    }
  }

  useEffect(() => {
    console.log("T3 : useEffect");
    assignUserStorage();
  }, [user])


  let screenTitle = null;
  if (authUserStored && authUserStored.role === "admin") { screenTitle = <UserProfile_adm /> }
  // faut-il vérifier la validité du Token pour autoriser l'envoi du formulaire ? - 14/08/25
=======
  const authUserStored = useAuthStore((state) => (state.user));
  //const setUser = userStore((state) => state.setUser)
  const setUserAddress = userAddressStore((state) => state.setUserAddress)
  const userAddress = userAddressStore((state) => state.userAddress)

  const [userAddressStorage, setUserAddressStorage] = useState<IUpdateProfile>({
    id: 0, email: "", last_name: "", first_name: "", birthdate: "",
    address: { user_id: 0, zip_code: "", street_number: "", street_name: "", city: "", }
  });

  const assignUserStorage = async (): Promise<void> => {
    try {
      const rud = await lStoreUserData(authUserStored); // get user from BDD
      const adr = await lStoreAddressData(authUserStored); // get Address from BDD
      console.log("adr : ", adr)
      const rudadr: IUpdateProfile = { ...rud, address: adr } // on "neste" adr (address) dans rud
      if (rud && rud.id != 0 && adr) {
        // pas de set du User dans le useState si pas de user (id=0 => valeur par défaut de userStorage)
        console.log("Dans le IF");
        setUserAddress(rudadr) // on set le store Zustand avec user complet (user + adresse)
      }
    }
    catch (error) { console.log("error : ", error); }
  }

  useEffect(() => { //Set le store au chargement de la page
    assignUserStorage();
    setUserAddressStorage(userAddress);
  }, [])



  let screenTitle = null;
  // Affichage spécifique aux Admins
  if (authUserStored && authUserStored.role === "admin") { screenTitle = <UserProfile_adm /> }
>>>>>>> BEN-92

  // check si bénévole pour rajouter 2 boutons en fin de page.
  const isVolunteer = authUserStored?.role && authUserStored.role == "volunteer" ? true : false;
  const isAdmin = authUserStored?.role && authUserStored.role === "admin" ? true : false;

<<<<<<< HEAD
  //const userThis: UserInterface = fakeUsers[id];


  const profileId = authUserStored?.id ? Number(authUserStored.id) : 0;
  //const fakeUser = fakeUsers.find((u) => (u.id === profileId));
  // attribution d'une adresse fake => devra être retournée + tard par une requête SQL join
  //  pour avoir l'adresse correspondant au user
  //const userAddress = fakeAddress.find((item) => (item.user_id === profileId));
  //const [userAddress, setUserAddress] = useState();
=======
>>>>>>> BEN-92

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IUpdateProfile>({
    defaultValues: {
      id: userAddress.id,
      first_name: userAddress.first_name ?? "",
      last_name: userAddress.last_name ?? "",
      email: userAddress.email ?? "",
      birthdate: userAddress.birthdate ?? "",
      phone_number: userAddress.phone_number ?? "",
      address: {
        zip_code: userAddress.address?.zip_code ?? "",
        street_number: userAddress.address?.street_number ?? "",
        street_name: userAddress.address?.street_name ?? "",
        city: userAddress.address?.city ?? "",
      }

    },
  });

  useEffect(() => {
    if (userAddress && userAddress.id) {
      reset(userAddress); // applique les valeurs chargées dans le form
    }
  }, [userAddress, reset])




  // Sans useForm<UserInterface>(), TypeScript infère automatiquement un type basé sur l’objet defaultValues
  // où "connected_user" est vu comme un simple string, et ne peut donc pas garantir
  //  la compatibilité avec SubmitHandler<UserInterface>

  // lors de la validation du formulaire (clic sur "enregistrer") => MAJ des données en Back (Nest et BDD)
  const onSubmit: SubmitHandler<IUpdateProfile> = async (data) => {
    const newData = await us.updateUserPut(userAddress.id ?? 0, data)
    if (newData) {
      //setUserAddress(newData.uptadedData); // MAJ du store 
      console.log("newData.updatedData : ", newData.updatedData);
    }
    flagUpdate = !flagUpdate // déclencheur useEffect
  }

  function imageProfileUrl(id: number): string {
    const photoUrl = `/images/UserProfile/photo-${id}.png`;
<<<<<<< HEAD
    //console.log("photoUrl : ", photoUrl);
=======
>>>>>>> BEN-92
    return photoUrl;
  }

  const [urlPhotoView, setUrlPhotoView] = useState<string>("/images/UserProfile/colomb-82.png");

  useEffect(() => {
<<<<<<< HEAD
    let photo = imageProfileUrl(userAddressStorage?.id || 0);
    //console.log("fakeUser.id : ", fakeUser?.id);
    console.log("userAddressStorage?.id : ",userAddressStorage.id )

=======
    let photo = imageProfileUrl(userAddress?.id || 0);
    console.log("userAddressStorage?.id : ", userAddress.id)
>>>>>>> BEN-92
    const imageLoad = async () => {
      try {
        const response = await axios.head(photo); // axios.head pour recup header
        const contentLength = response.headers["content-length"];

        if (contentLength) { // autrement dit, si on a pu récupérer l'image
          const size = parseInt(contentLength, 10);
          console.log(`Taille de l'image : ${size} octets`);
        } else {
<<<<<<< HEAD
          //console.log(`En-tête content-length non trouvée`);
          photo = "/images/UserProfile/colomb-82.png";
        }
        setUrlPhotoView(photo);
        //console.log("photo : ", photo);
      } catch (error) {
        console.log("erreur dans l'adresse de l'image : ", error);
      }
      //console.log(`photoView :  ${urlPhotoView}`);
=======
          photo = "/images/UserProfile/colomb-82.png";
        }
        setUrlPhotoView(photo);
      } catch (error) {
        console.log("erreur dans l'adresse de l'image : ", error);
      }
>>>>>>> BEN-92
    };
    imageLoad();
  }, []);


  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border-0 border-blue-500">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-0 border-amber-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {isAdmin && screenTitle}

            <section id="sectionTop" className="h-1/3 grid sm:grid-cols-5">
              {" "}
              {/* alignement sur 2 colonnes */}
              {/* ********************************************* SECTION ************************************/}
              <div className="col-span-3 max-sm:-col-end-3">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-4 text-gray-900 "
                >
                  {" "}
                  Nom{" "}
                </label>

                <div className="mt-1 mb-2">
                  {" "}
                  {/* !!! mt-2 => mt-1 mb-2 */}
                  <input
                    id="last_name"
                    type="text"
                    // autoComplete="email"
                    placeholder={userAddress?.last_name || " Nom"}
                    {...register("last_name", {
                      required: "Le nom est obligatoire.",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4"
                  />
                  {errors.last_name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>

                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-4 text-gray-900"
                >
                  {" "}
                  Prénom{" "}
                </label>
                <div className="mt-1 mb-2">
                  <input
                    id="first_name"
                    type="text"
                    // autoComplete="email"
                    placeholder={userAddress?.first_name || " Prénom"}
                    {...register("first_name", { required: "Champ requis." })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4"
                  />
                  {errors.first_name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                <label
                  htmlFor="birthdate"
                  className="block text-sm font-medium leading-4 text-gray-900"
                >
                  {" "}
                  Date de naissance{" "}
                </label>
                <div className="mt-1 mb-2">
                  <input
                    id="birthdate"
                    type="date"

                    placeholder={userAddress?.birthdate || " Date de naissance"}
                    {...register("birthdate", {
                      valueAsDate: true,
                      required: false,
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4"
                  />
                  {errors.birthdate && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.birthdate.message}
                    </p>
                  )}
                </div>
                {/* fakeUser.birthdate : {fakeUser.birthdate} */}
              </div>
              <div className="flex flex-col col-span-2 justify-around items-center border-0 border-pink-500">
                {/*  Affichage Christophe Colomb si role = "admin", sinon photo de profil utilisateur. */}
                {<img className="w-3/5 mt-3" src={isAdmin && "/images/adminAvatar.png" || urlPhotoView} alt="Photo de profil" />}
                {" "}
                {/*   <PHOTO>   */}
                <div className="grid grid-col-5 col-span-5 text-sm justify-right">
                  {" "}
                  {/*   <BOUTON>   */}
                  {!isAdmin && <button type="submit" className="custom-button paddingButton2" > chang. Photo </button>}

                </div>
              </div>
            </section>{" "}
            {/* Fin alignement sur 2 colonnes */}
            {/* ********************************************* SECTION ********************************/}
            <section id="sectionCenter" className="h-1/3 w-full">
              {/* <h1>MID</h1> */}

              <div className="grid grid-cols-3 col-span-3 border-2 border-amber-600 rounded-md p-2">
                {/* = = = = = = = = */}
                <label
                  htmlFor="streetnum"
                  className=" w-fit text-sm font-normal leading-normal text-gray-900 "
                >
                  {" "}
                  N° de voie{" "}
                </label>

                <div className="col-span-2 mt-1 mb-2">
                  {" "}
                  {/* !!! mt-2 => mt-1 mb-2 */}
                  <input
                    id="streetnum"
                    type="text"
                    // autoComplete=""
                    //placeholder={userAddress?.street_number || " N° de voie"}
                    placeholder={userAddress.address?.street_number || " N° de voie"}
                    {...register("address.street_number", {
                      //required: "Le nom est obligatoire.",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4"
                  />
                  {errors.address?.street_number && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.address.street_number.message}
                    </p>
                  )}
                </div>
                {/* = = = = = = = = */}
                {/* = = = = = = = = */}
                <label
                  htmlFor="address"
                  className="inline-block text-sm font-normal leading-normal text-gray-900 "
                >
                  {" "}
                  Adresse{" "}
                </label>

                <div className="col-span-2 mt-1 mb-2">
                  {" "}
                  {/* !!! mt-2 => mt-1 mb-2 */}
                  <input
                    id="address"
                    type="text"
                    // autoComplete=""
                    placeholder={userAddress.address?.street_name || " Nom de la rue/voie/Lieu-dit,..."}
                    {...register("address.street_name", {
                      //required: "Le nom est obligatoire.",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4"
                  />
                  {errors.address?.street_name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.address?.street_name.message}
                    </p>
                  )}
                </div>
                {/* = = = = = = = = */}
                {/* = = = = = = = = */}
                <label
                  htmlFor="zipcode"
                  className="inline-block text-sm font-normal leading-normal text-gray-900 "
                >
                  {" "}
                  Code postal{" "}
                </label>

                <div className="col-span-2 mt-1 mb-2">
                  {" "}
                  {/* !!! mt-2 => mt-1 mb-2 */}
                  <input
                    id="zipcode"
                    type="text"
                    // autoComplete=""
                    placeholder={userAddress.address?.zip_code || " CP"}
                    {...register("address.zip_code", {
                      //required: "Le nom est obligatoire.",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4"
                  />
                  {errors.address?.zip_code && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.address.zip_code.message}
                    </p>
                  )}
                </div>
                {/* = = = = = = = = */}
                {/* = = = = = = = = */}
                <label
                  htmlFor="city"
                  className="inline-block text-sm font-normal leading-normal text-gray-900 "
                >
                  {" "}
                  Ville{" "}
                </label>

                <div className="col-span-2 mt-1 mb-2">
                  {" "}
                  {/* !!! mt-2 => mt-1 mb-2 */}
                  <input
                    id="city"
                    type="text"
                    placeholder={userAddress.address?.city || " Commune de résidence"}
                    {...register("address.city", {
                      //required: "Le nom est obligatoire.",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4"
                  />
                  {errors.address?.city && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.address?.city.message}
                    </p>
                  )}
                </div>
                {/* = = = = = = = = */}
              </div>
            </section>
            {/* ********************************************* SECTION *********************/}
            {/* adaptation pour écran du bénévole */}

            <section
              id="sectionBottom"
              className="h-1/3 grid grid-cols-5"
            >
              <div className="grid-cols-3 col-span-3 border-0 border-pink-900">
                <div className="border-0 border-green-200 col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-4 text-gray-900"
                  >
                    Adresse Email
                  </label>
                  <div className="mt-1 mb-2 border-0 border-green-500">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
<<<<<<< HEAD
                      placeholder={userAddressStorage?.email || " Email"}
=======
                      //placeholder={userAddressStorage?.email || " Email"}
                      placeholder={userAddress?.email || " Email"}
>>>>>>> BEN-92
                      {...register("email", {
                        required: "Renseignez votre e-mail, svp",
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                                  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                                  focus:ring-inset focus:ring-sky-950 sm:text-sm sm:leading-4"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-4 text-gray-900"
                    >
                      Mot de passe
                    </label>
                  </div>
                  <div className="mt-1 mb-2">
                    <input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Mot de passe"
                      /*
                      {...register("password", {
                        required: "Mot de passe requis !",
                      })}
                        */
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                                  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                                  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4"
                    />

                    {/* {errors.password && ( */}
                    {/* <p className="text-sm text-red-500 mt-1"> */}
                    {/* {errors.password.message} */}
                    {/* </p> */}
                    {/* )} */}

                  </div>
                </div>


              </div>

              <div className="flex flex-col justify-around col-span-2 ml-2">
                {/* <button type="submit" className="custom-button paddingButton2 col-start-2 col-end-3" onClick={handleSubmit(us.updateUserPut.call)}> */}
                <button type="submit" className="custom-button paddingButton2 col-start-2 col-end-3" onClick={handleSubmit(onSubmit)}>
                  {/*Mettre à jour */}
                  Enregistrer
                </button>
                <button type="submit" className="custom-button paddingButton2 col-start-2 col-end-3">
                  {/*Modif mot de passe*/}
                  Modif. pass.
                </button>

              </div>
            </section>

            <section id="sectionVolunteer">
              {isVolunteer && <VolunteerSection />}
            </section>
          </form>
        </div>
      </div>

    </>
  );
};

export default UserProfile;









