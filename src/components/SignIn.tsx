import { useForm } from "react-hook-form";

type FormValues ={
  email: string;
  password: string;
}

export default function SignIn(){

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = async (data :{email: string, password: string}) => {
      try {
        console.log(data)
      } catch (error) {
        console.log("erreur", error)
      }
    }

      return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Connexion
            </h2>
          </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Adresse Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder=" Email"
                  {...register("email", { required: "Email is required" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  {...register("password", { required: "Password is required" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="custom-button"
              >
                Connexion
              </button>
            </div>
          </form>
        </div>
    </div>
  );


}
