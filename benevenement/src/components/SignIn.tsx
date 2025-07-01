import { useForm } from "react-hook-form";
// import { useUser } from "../contexts/UserContext";

/* import type { SubmitHandler } from "react-hook-form";
 */
type FormValues ={
  email: string;
  password: string;
}

export default function SignIn(){

//   const { login } = useUser();
  // setUser est une fonction qui permet de mettre Ã  jour l'utilisateur dans le contexte UserProvider

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
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
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
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", { required: "Password is required" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm
                          font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500
                          focus-visible:outline-2 focus-visible:outline-offset-2
                          focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p>
        </div>
    </div>
  );


}