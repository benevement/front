import { useForm } from "react-hook-form";
import UserService from '../services/UserService';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

type FormValues = {
  email: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();
  const userService = new UserService();
  const password = watch("password") || "";

  const onSubmit = async (data: FormValues) => {
    try {
      await userService.register({
        email: data.email,
        password: data.password,
        phone_number: data.phone_number,
      });

      console.log("✅ Inscription réussie");
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('Erreur inattendue', err);
      }
    }
  };


  return (
    <div className="flex max-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Inscription
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Adresse Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                {...register("email", { required: "Email est requis" })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Mot de passe
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Mot de passe"
                {...register("password", {
                  required: "Le mot de passe est requis",
                })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirmer le mot de passe
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Confirmez le mot de passe"
                {...register("confirmPassword", {
                  required: "Confirmez le mot de passe",
                  validate: (value) => value === password || "Les mots de passe ne correspondent pas",
                })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Numéro de téléphone
            </label>
            <div className="mt-2">
              <input
                id="phone_number"
                type="tel"
                autoComplete="tel"
                placeholder="Numéro de téléphone optionnel"
                {...register("phone_number")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.phone_number && (
                <p className="text-sm text-red-500 mt-1">{errors.phone_number.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between p-3 space-x-4">
            <button
              type="submit"
              className="custom-button font-semibold rounded-md shadow-md"
            >
              S'inscrire
            </button>
            <button>
              <Link to="/" className="custom-button font-semibold rounded-md shadow-md">
                Retour
              </Link>
            </button>
          </div>
        </form>
        <div>
          Vous avez déjà un compte ? <a href="/signin"> Se connecter</a>
        </div>
      </div>
    </div>
  );
}
