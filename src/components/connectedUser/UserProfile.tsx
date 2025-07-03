import {useForm, SubmitHandler} from "react-hook-form";
import UserInterface, {roleType} from "../../interfaces/IUser";
import { unknown } from "zod/v4";



const UserProfile = () => {

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


    return (
        <>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          
          {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Connexion
            </h2>
          </div> */}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 border-amber-500">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Last Name */}

            <div className="columns-2">
              {/* ********************************************* */}
              <div>
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


            {/* Fin alignement sur 2 colonnes */}
            {/* ********************************************* */}


            
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Adresse Email
              </label>
              <div className="mt-2">
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
              <div className="mt-2">
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
            <div className="flex justify-center">
              <button type="submit" className="custom-button" >
                MODIFY PROFILE IMAGE
              </button>
            </div>
          </form>
        </div>
    </div>
        </>
    )
}

export default UserProfile;