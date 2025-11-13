// Revision : 15/09/25
// 07/07/25 : tous les leading-6 remplacés par des leading-4 => hauteur de ligne pour le texte au-dessus des champs input

import { useForm, SubmitHandler } from "react-hook-form";
import { IUpdateProfile} from "../../interfaces/IUser";
import { useEffect, useState } from "react";
import { userAddressStore } from "../../stores/userStore";
import { VolunteerSection } from "../volunteer/UserProfile_vol";
import UserProfile_adm from "../admin/UserProfile_adm";
import UserService from "../../services/UserService";
import { useAuthStore } from "../../stores/useAuthStore";
import axios from "axios";
import { lStoreAddressData, lStoreUserData } from "../../services/api/axiosProfile";
import Dialog_success from "../../utils/Dialog_success";

const UserProfile = () => {

  const us = new UserService();
  // variables d'authentifications tirées du store
  const authUserStored = useAuthStore((state) => (state.user));
  //const setUser = userStore((state) => state.setUser)
  const setUserAddress = userAddressStore((state) => state.setUserAddress)
  const userAddress = userAddressStore((state) => state.userAddress)

  const [isSuccessfull, setIsSuccessfull] = useState<boolean>(false); // pour boite de dialogue update OK

  // Récupération de certaines datas du user pour les mettre en local storage persist
  const assignUserStorage = async (): Promise<void> => {
    try {
      const rud = await lStoreUserData(authUserStored); // get user from BDD
      //console.log("[assignUserStorage] rud : ", rud) // TODO: DEBUG
      const adr = await lStoreAddressData(authUserStored); // get Address from BDD
      //console.log("[assignUserStorage] adr : ", adr) // TODO: DEBUG
      const rudadr: IUpdateProfile = { ...rud, address: adr } // on "neste" adr (address) dans rud
      //console.log("[assignUserStorage] rudadr : ", rudadr) // TODO: DEBUG
      if (rud && rud.id != 0 && adr) {
        // pas de set du User dans le useState si pas de user (id=0 => valeur par défaut de userStorage)
        setUserAddress(rudadr) // on set le store Zustand avec user complet (user + adresse)
      }
    }
    catch (error) { console.log("error : ", error); }
  }

  useEffect(() => { // Set le store au chargement de la page
    assignUserStorage();
  }, [])


  let screenTitle = null;
  // Affichage spécifique aux Admins
  if (authUserStored && authUserStored.role === "admin") { screenTitle = <UserProfile_adm /> }

  // check si bénévole pour rajouter 2 boutons en fin de page.
  const isVolunteer = authUserStored?.role && authUserStored.role == "volunteer" ? true : false;
  const isAdmin = authUserStored?.role && authUserStored.role === "admin" ? true : false;

  // react-hook-form
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IUpdateProfile>({
    defaultValues: {
      id: userAddress.id,
      first_name: userAddress.first_name ?? "",
      last_name: userAddress.last_name ?? "",
      email: userAddress.email ?? "",
      birthdate: userAddress.birthdate ?? new Date("1970-01-03"),
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

  // reset de la Modal Dialog_success / InfoBox
  useEffect(() => {
    if (isSuccessfull) setTimeout(() => (setIsSuccessfull(false)), 5000)
  }, [isSuccessfull])


  // lors de la validation du formulaire (clic sur "enregistrer") => MAJ des données en Back (Nest et BDD)
  const onSubmit: SubmitHandler<IUpdateProfile> = async (data) => {
    //console.log("OnSubmit userProfile avant us.updateUserPut()") //DEBUG: TODO:
    //console.log("[onSubmit] data : ", JSON.stringify(data)) //DEBUG: TODO:

    // Suppression des espaces vides (trim) avant envoi des données vers le Back


    const dataTrimmed = Object.fromEntries(
      Object.entries(data).map(
        ([key, value]) => ([key, typeof value === "string" ? value.trim() : value])
      )
    )

    const dataTrimmed2 = Object.fromEntries( // idem pour objet "Address", nesté.
      Object.entries(dataTrimmed.address).map(
        ([key, value]) => ([key, typeof value === "string" ? value.trim() : value])
      )
    )

    const dataTrimmed3 = { ...dataTrimmed, ...dataTrimmed2 }; // on recréé l'ensemble (fusion)

    //console.log(`dataTrimmed : ${JSON.stringify(dataTrimmed3)}`) //DEBUG: TODO:
    // vers requête Axios
    const newData = await us.updateUserPut(userAddress.id ?? 0, dataTrimmed3)
    if (newData) {
      //setUserAddress(newData.uptadedData); // MAJ du store 
      //console.log("newData.updatedData : ", newData.updatedData); //DEBUG: TODO:
      if (newData.status && newData.status === 200) setIsSuccessfull(true);
    }
  }

  function imageProfileUrl(id: number): string {
    const photoUrl = `/images/UserProfile/photo-${id}.png`;
    return photoUrl;
  }

  const [urlPhotoView, setUrlPhotoView] = useState<string>("/images/UserProfile/colomb-82.png");

  useEffect(() => {
    let photo = imageProfileUrl(userAddress?.id || 0);
    //console.log("userAddressStorage?.id : ", userAddress.id)
    const imageLoad = async () => {
      try {
        const response = await axios.head(photo); // axios.head pour recup header
        const contentLength = response.headers["content-length"];

        if (contentLength) { // autrement dit, si on a pu récupérer l'image
          const size = parseInt(contentLength, 10);
          //console.log(`Taille de l'image : ${size} octets`);
        } else {
          photo = "/images/UserProfile/colomb-82.png";
        }
        setUrlPhotoView(photo);
      } catch (error) {
        console.log("erreur dans l'adresse de l'image : ", error);
      }
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

                    // placeholder={userAddress?.birthdate?.toLocaleDateString() || " Date de naissance"}
                    {...register("birthdate", {
                      valueAsDate: true,  // handleSubmit recevra une instance de Date (pas un String)
                      // ex : object (new Date("2025-11-13"))
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
                  {!isAdmin && <button type="button" className="custom-button paddingButton2" > chang. Photo </button>}

                </div>
              </div>
            </section>{" "}
            {/* Fin alignement sur 2 colonnes */}
            {/* ********************************************* SECTION ********************************/}
            <section id="sectionCenter" className="h-1/3 w-full">
              {/* <h1>MID</h1> */}

              <div className="grid grid-cols-3 col-span-3 border-1 border-amber-600 rounded-md p-2">
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
                      required: "Le code postal est indispensable.",
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
                      //placeholder={userAddressStorage?.email || " Email"}
                      placeholder={userAddress?.email || " Email"}
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
                <button type="button" className="custom-button paddingButton2 col-start-2 col-end-3">
                  {/*Modif mot de passe*/}
                  Modif. pass.
                </button>

              </div>

            </section>
            <section id="sectionVolunteer">
              {isVolunteer && <VolunteerSection />}
            </section>
          </form>
          {isSuccessfull && <Dialog_success />}
        </div>
      </div>

    </>
  );
};

export default UserProfile;









