import {useForm, SubmitHandler} from "react-hook-form";
import UserInterface, {roleType} from "../../interfaces/IUser";
import { number, unknown } from "zod/v4";
import { useEffect, useState } from "react";
import fakeUsers from "../../data/fakeUsers";
import { useLocation } from "react-router-dom";
import axios, { AxiosResponseHeaders } from "axios";


const UserProfile = (user: UserInterface) => {

  const location = useLocation();
  const id=79; // en dur  
  const userThis: UserInterface = fakeUsers[id];  


  const { register, handleSubmit, formState: {errors} } = useForm<UserInterface>({ 
      defaultValues: {
          id: 0,
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          birthdate: "",
          avatar: "",
          role: "connected_user",
          phone_number: "",
          cPassword: "",

      } 
  });
  // Sans useForm<UserInterface>(), TypeScript infère automatiquement un type basé sur l’objet
  //  defaultValues (où "connected_user" est vu comme un simple string), et ne peut donc pas garantir
  //  la compatibilité avec SubmitHandler<UserInterface>

  const onSubmit: SubmitHandler<UserInterface> = (data) => console.log(data);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      //console.log("email dans signup : ", email);
      // traitement
  }

  
  function loadImageProfile(id: number): string{
    const photoUrl = `/images/UserProfile/photo-${id}.png`;
    return photoUrl;
  }
  const [urlPhotoView, setUrlPhotoView] = useState<string>("/images/UserProfile/colomb-82.png");

  useEffect(() => {

    const photo = loadImageProfile(id);
    const imageLoad = async() => {
    try {
        
        const response = await axios.head(photo); // axios.head pour recup header
        const contentLength =  response.headers['content-length'];
        
        if (contentLength){
          const size = parseInt(contentLength, 10);
          console.log(`Taille de l'image : ${size} octets`);
        }
        else {
          console.log(`En-tête content-length non trouvée`);
        }
        setUrlPhotoView(photo);
        console.log("photo : ", photo);
        }
        catch (error){
          console.log("erreur dans l'adresse de l'image");
        };
          console.log(`photoView :  ${urlPhotoView}`);
       }
},[]);

  //console.log("location : ",location.pathname)

      return (
          <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border-2 border-b-blue-500">
            
            {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Connexion
              </h2>
            </div> */}

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 border-amber-500">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              

              <section id="sectionTop" className="h-1/3 grid sm:grid-cols-5 bg-amber-300">  {/* alignement sur 2 colonnes */}
                {/* ********************************************* */}
                <div className="bg-blue-400 col-span-3 ">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 "> Nom </label>

                <div className="mt-1 mb-2"> {/* !!! mt-2 => mt-1 mb-2 */}
                  <input
                    id="last_name"
                    type="text"
                    // autoComplete="email"
                    placeholder=" Nom"
                    {...register("last_name", { required: "Le nom est obligatoire." })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.last_name && <p className="text-sm text-red-500 mt-1">{errors.last_name.message}</p>}
                </div>
                
                
                <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900"> Prénom </label>
                <div className="mt-1 mb-2">
                  <input
                    id="first_name"
                    type="text"
                    // autoComplete="email"
                    placeholder=" Prénom"
                    {...register("first_name", { required: "Champ requis." })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.first_name && <p className="text-sm text-red-500 mt-1">{errors.first_name.message}</p>}
                </div>

                <label htmlFor="birthdate" className="block text-sm font-medium leading-6 text-gray-900"> Date de naissance </label>
                <div className="mt-1 mb-2">
                  <input
                    id="birthdate"
                    type="date"
                    // autoComplete="email"
                    placeholder=" Date de naissance"
                    {...register("birthdate", { valueAsDate: true, required: false  })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.birthdate && <p className="text-sm text-red-500 mt-1">{errors.birthdate.message}</p>}
                </div>
              </div>
              <div className="bg-blue-600 col-span-2 justify-self-center">
                <h3>
                  Colonne 2
                </h3>
                <img src={urlPhotoView} alt="Photo de profil"></img>
                
                
              </div>
              
              </section> {/* Fin alignement sur 2 colonnes */}
              
              {/* ********************************************* */}

              <section id="sectionCenter" className="h-1/3 w-full bg-emerald-200">
                <h1>MID</h1>
              </section>

              <section id="sectionBottom" className="h-1/3 grid grid-cols-5 bg-pink-200">
                <div className="col-span-3">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Adresse Email
                    </label>
                    <div className="mt-1 mb-2">
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder=" Email"
                        {...register("email", { required: "Renseignez votre e-mail, svp" })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                                  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                                  focus:ring-inset focus:ring-sky-950 sm:text-sm sm:leading-6"
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Mot de passe
                      </label>
                    </div>
                    <div className="mt-1 mb-2">
                      <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder=" Mot de passe"
                        {...register("password", { required: "Mot de passe requis !" })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                                  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                                  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                    </div>
                  </div>

                  {/* Submit */}
                  
                </div>
        
              </section>
                    <div className="grid grid-col-5 col-span-5 justify-center items-center bg-emerald-400">
                    <button type="submit" className="custom-button" >
                      METTRE A JOUR
                    </button>
                  </div>
            </form>
            
          </div>
      </div>
          </>
      )
}

export default UserProfile;