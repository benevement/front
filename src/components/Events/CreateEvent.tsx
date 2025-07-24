import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import VolunteerModal from "./VolunteerModal";
import { IEvent } from "../../interfaces/IEvent";
import EventService from "../../services/EventService";
import { useNavigate } from "react-router-dom";

type Volunteer = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};


export default function CreateEvent() {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IEvent>();

  const navigate = useNavigate();
  const eventService = new EventService();

  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [invitedVolunteers, setInvitedVolunteers] = useState<number[]>([]);


  useEffect(() => {
    // Chargement des volontaires
    axios.get("http://localhost:3000/users").then((res) => {
      setVolunteers(res.data);
      console.log(res);
    });
  }, []);


  const onSubmit = async (data: IEvent) => {
    try {
      console.log(data, invitedVolunteers);
      const eventData = {
        ...data, invitedVolunteers, creatorId: 1
      }
      const response = await eventService.createEvent(eventData);
      if (response.status === 201)
        navigate(`/events/${response.data.id}`);
    } catch (error) {
      console.error("Erreur lors de la création de l’événement", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-xl bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Créer un événement</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Nom</label>
            <input
              type="text"
              {...register("name", { required: "Le nom est requis" })}
              placeholder="Nom de l'événement"
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Description</label>
            <textarea
              {...register("description", { required: "La description est requise" })}
              placeholder="Description de l'événement"
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
          </div>

         {/* Adresse - Numéro de rue */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Numéro de la rue</label>
            <input
              type="text"
              {...register("address.street_number", { required: "Le numéro est requis" })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
            {errors.address?.street_number && (
              <p className="text-sm text-red-500 mt-1">{errors.address.street_number.message}</p>
            )}
          </div>

          {/* Adresse - Nom de rue */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Nom de la rue</label>
            <input
              type="text"
              {...register("address.street_name", { required: "Le nom de la rue est requis" })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
            {errors.address?.street_name && (
              <p className="text-sm text-red-500 mt-1">{errors.address.street_name.message}</p>
            )}
          </div>

          {/* Ville */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Ville</label>
            <input
              type="text"
              {...register("address.city", { required: "La ville est requise" })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
            {errors.address?.city && (
              <p className="text-sm text-red-500 mt-1">{errors.address.city.message}</p>
            )}
          </div>

          {/* Code postal */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Code postal</label>
            <input
              type="text"
              {...register("address.zip_code", { required: "Le code postal est requis" })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
            {errors.address?.zip_code && (
              <p className="text-sm text-red-500 mt-1">{errors.address.zip_code.message}</p>
            )}
          </div>


          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Date</label>
            <input
              type="date"
              {...register("date", { required: "La date est requise" })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
            {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>}
          </div>

          {/* Volontaires nécessaires */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Nombre de volontaires nécessaires</label>
            <input
              type="number"
              {...register("volunteers_needed", {
                required: "Ce champ est requis",
                min: { value: 1, message: "Minimum 1 volontaire" },
              })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
            {errors.volunteers_needed && (
              <p className="text-sm text-red-500 mt-1">{errors.volunteers_needed.message}</p>
            )}
          </div>

        {/* Volontaires invités (avec champ caché pour RHF) */}
        <div className="flex flex-col">
            <label className="flex justify-center text-sm font-medium text-gray-900 mb-2">
              Inviter des volontaires
            </label>

            {/* Bouton pour ouvrir la modale */}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="custom-button flex items-center justify-center"
            >
              Choisir des bénévoles
            </button>

            {/* Champ caché pour RHF */}
            <input
              type="hidden"
              {...register("invitedVolunteers", {
                required: "Vous devez inviter au moins un volontaire.",
                validate: (value) =>
                  value && value.length > 0 || "Vous devez inviter au moins un volontaire.",
              })}
            />

            {/* Affichage des volontaires sélectionnés */}
            {invitedVolunteers.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                {volunteers
                  .filter((v) => invitedVolunteers.includes(v.id))
                  .map((volunteer) => (
                    <li key={volunteer.id}>
                      {volunteer.firstname} {volunteer.lastname}
                    </li>
                  ))}
              </ul>
            )}

            {/* Erreur si aucun volontaire sélectionné */}
            {errors.invitedVolunteers && (
              <p className="text-sm text-red-500 mt-1">
                {errors.invitedVolunteers.message}
              </p>
            )}

            {/* Modale de sélection des bénévoles */}
              {showModal && (
                <VolunteerModal
                  volunteers={volunteers}
                  selectedIds={invitedVolunteers} // ✅ juste les IDs
                  onClose={() => setShowModal(false)}
                  onConfirm={(selected) => {
                    const selectedIds = selected.map(v => v.id);
                    setInvitedVolunteers(selectedIds); // ✅ on ne garde que les IDs
                    setValue("invitedVolunteers", selectedIds); // pour RHF
                    trigger("invitedVolunteers"); // déclenche validation
                    setShowModal(false);
                  }}
                />
              )}
          </div>

          <div className="flex justify-center pt-4 ">
            <button
              type="submit"
              className="custom-button"
            >
              Créer l’événement
            </button>
          </div>
        </form>
    </div>
  </div>
  );
}
