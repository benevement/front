import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import VolunteerModal from "./VolunteerModal";
import { IEvent } from "../../interfaces/IEvent";
import EventService from "../../services/EventService";
import { useAuthStore } from "../../stores/useAuthStore";

const eventService = new EventService();

type Volunteer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export default function EventForm() {
   const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<IEvent>();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore.getState();
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [invited_volunteers, setInvitedVolunteers] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<IEvent | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);


  useEffect(() => {
    //axios.get("http://localhost:3000/users").then((res) => {
    // passage à docker :
      axios.get("http://benevback:3000/users").then((res) => {
      setVolunteers(res.data);
    });
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      try {
        setIsEditing(true);
        const numericId = parseInt(id);
        const eventWithAddress = await eventService.getEventWithAddressById(numericId);

        reset({
          ...eventWithAddress,
          event_date: formatDateForInput(eventWithAddress.event_date),
          end_invitation_date: formatDateForInput(eventWithAddress.end_invitation_date),
          address: eventWithAddress.address || {}, // pour pré-remplir les champs address
        });

        setInvitedVolunteers(eventWithAddress.invited_volunteers || []);
        setCurrentEvent(eventWithAddress);
        if (currentEvent != null) console.log("currentEvent : ",currentEvent) // sinon erreur linter
        setCurrentStatus(eventWithAddress.status);

      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
  }, [id, reset]);


  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

   const onCreate = async (data: IEvent) => {
    try {
      if (!user) throw new Error("Utilisateur non authentifié");
      const eventData = { ...data, invited_volunteers, created_by_id: user.id };
      console.log("data création", eventData)
      const response = await eventService.createEvent(eventData);
      if (response.status === 201) navigate(`/events/${response.data.id}`);
    } catch (error) {
      console.error("Erreur lors de la création de l’événement", error);
    }
  };

  const onUpdate = async (data: IEvent) => {
    try {
      if (!id) return;
      const eventData = { ...data, invited_volunteers };
      await eventService.updateEvent(Number(id), eventData);
      navigate(`/events/${id}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l’événement", error);
    }
  };

  const onDelete = async () => {
    try {
      if (!id) return;
      await eventService.deleteEvent(Number(id));
      navigate("/events");
    } catch (error) {
      console.error("Erreur lors de la suppression de l’événement", error);
    }
  };

  const onPublish = async () => {
    try {
      if (!id) return;
      const updated = await eventService.publishEvent(Number(id));
      setCurrentEvent(updated);
      setCurrentStatus(updated.status); // mettre à jour le state local
      reset({
        ...updated,
        date: formatDateForInput(updated.date), // garde la même logique que dans useEffect
    }); // rafraîchir le formulaire
    } catch (error) {
      console.error("Erreur lors de la publication de l’événement", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-xl bg-white rounded-lg p-6">
         <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {isEditing ? "Modifier l’événement" : "Créer un événement"}
        </h2>

        <form  onSubmit={handleSubmit(isEditing ? onUpdate : onCreate)} className="space-y-6 bg-white p-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Nom</label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Le nom est requis" })}
              placeholder="Nom de l'événement"
              className="mt-1 block w-full border rounded-md px-3 py-2"
              disabled={currentStatus === "published"}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Description</label>
            <textarea
             id="description"
              {...register("description", { required: "La description est requise" })}
              placeholder="Description de l'événement"
              className="mt-1 block w-full border rounded-md px-3 py-2"
              disabled={currentStatus === "published"}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
          </div>

         {/* Adresse - Numéro de rue */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Numéro de la rue</label>
            <input
              id="street_number"
              type="text"
              {...register("address.street_number", { required: "Le numéro est requis" })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
              disabled={currentStatus === "published"}
            />
            {errors.address?.street_number && (
              <p className="text-sm text-red-500 mt-1">{errors.address.street_number.message}</p>
            )}
          </div>

          {/* Adresse - Nom de rue */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Nom de la rue</label>
            <input
              id="street_name"
              type="text"
              {...register("address.street_name", { required: "Le nom de la rue est requis" })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
              disabled={currentStatus === "published"}
            />
            {errors.address?.street_name && (
              <p className="text-sm text-red-500 mt-1">{errors.address.street_name.message}</p>
            )}
          </div>

          {/* Ville */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Ville</label>
            <input
              id="city"
              type="text"
              {...register("address.city", { required: "La ville est requise" })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
              disabled={currentStatus === "published"}
            />
            {errors.address?.city && (
              <p className="text-sm text-red-500 mt-1">{errors.address.city.message}</p>
            )}
          </div>

          {/* Code postal */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Code postal</label>
            <input
              id="zip_code"
              type="text"
              {...register("address.zip_code", { required: "Le code postal est requis" })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
              disabled={currentStatus === "published"}
            />
            {errors.address?.zip_code && (
              <p className="text-sm text-red-500 mt-1">{errors.address.zip_code.message}</p>
            )}
          </div>


          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Date</label>
            <input
              id="date"
              type="date"
              {...register("event_date", { required: "La date est requise" })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
              disabled={currentStatus === "published"}
            />
            {errors.event_date && <p className="text-sm text-red-500 mt-1">{errors.event_date.message}</p>}
          </div>

          {/* Volontaires nécessaires */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Nombre de volontaires nécessaires</label>
            <input
              id="volunteers_needed"
              type="number"
              {...register("volunteers_needed", {
                required: "Ce champ est requis",
                min: { value: 1, message: "Minimum 1 volontaire" },
              })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
              disabled={currentStatus === "published"}
            />
            {errors.volunteers_needed && (
              <p className="text-sm text-red-500 mt-1">{errors.volunteers_needed.message}</p>
            )}
          </div>

          {/* Max Participants */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Nombre maximum de participants</label>
            <input
              id="max_participants"
              type="number"
              {...register("max_participants", {
                required: "Le nombre de participants est requis",
                min: { value: 1, message: "Doit être au moins 1" }
              })}
              placeholder="Nombre maximum de participants"
              className="mt-1 block w-full border rounded-md px-3 py-2"
              disabled={currentStatus === "published"}
            />
            {errors.max_participants && <p className="text-sm text-red-500 mt-1">{errors.max_participants.message}</p>}
          </div>

          {/* End Invitation Date */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Date de fin des invitations</label>
            <input
              id="end_invitation_date"
              type="date"
              {...register("end_invitation_date", { required: "La date de fin d'invitation est requise" })}
              className="mt-1 block w-full border rounded-md px-3 py-2"
              disabled={currentStatus === "published"}
            />
            {errors.end_invitation_date && <p className="text-sm text-red-500 mt-1">{errors.end_invitation_date.message}</p>}
          </div>

          {/* Volontaires invités (avec champ caché pour RHF) */}
          <div className="flex flex-col">

            {/* Bouton pour ouvrir la modale */}
            {currentStatus !== "published" && (
                <>
                  <label className="flex justify-center text-sm font-medium text-gray-900 mb-2">
                    Inviter des volontaires
                  </label>

                  <button
                  id="invite-volunteers"
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="custom-button flex items-center justify-center"
                  >
                    Choisir des bénévoles
                  </button>
                </>
              )}

            {/* Champ caché pour RHF */}
            <input
              id="invited_volunteers"
              type="hidden"
              {...register("invited_volunteers", {
                required: "Vous devez inviter au moins un volontaire.",
                validate: (value) =>
                  value && value.length > 0 || "Vous devez inviter au moins un volontaire.",
              })}
            />

            {/* Affichage des volontaires sélectionnés */}
            {invited_volunteers.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                {volunteers
                  .filter((v) => invited_volunteers.includes(v.id))
                  .map((volunteer) => (
                    <li key={volunteer.id}>
                      {volunteer.first_name} {volunteer.last_name}
                    </li>
                  ))}
              </ul>
            )}

            {/* Erreur si aucun volontaire sélectionné */}
            {errors.invited_volunteers && (
              <p className="text-sm text-red-500 mt-1">
                {errors.invited_volunteers.message}
              </p>
            )}

            {/* Modale de sélection des bénévoles */}
              {showModal && (
                <VolunteerModal
                  volunteers={volunteers}
                  selectedIds={invited_volunteers}
                  onClose={() => setShowModal(false)}
                  onConfirm={(selected) => {
                    const selectedIds = selected.map(v => v.id);
                    setInvitedVolunteers(selectedIds);
                    setValue("invited_volunteers", selectedIds);
                    trigger("invited_volunteers");
                    setShowModal(false);
                  }}
                />
              )}
          </div>

          <div className="flex justify-center pt-4 space-x-4">
            {/* Si pas publié → on peut éditer */}
            {isEditing && currentStatus !== "published" && (
              <>
                <button type="submit" className="custom-button">
                  Mettre à jour
                </button>
                <button
                  type="button"
                  onClick={onPublish}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Publier
                </button>
              </>
            )}

            {/* Si publié → on ne peut plus modifier, juste supprimer */}
            {isEditing && currentStatus === "published" && (
              <p className="text-sm text-gray-600 italic">Cet événement est publié et ne peut plus être modifié.</p>
            )}

            {/* Supprimer est toujours dispo en édition */}
            {isEditing && (
              <button
                id="delete-event"
                type="button"
                onClick={onDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Supprimer
              </button>
            )}

            {/* En création */}
            {!isEditing && (
              <button
                id="create-event"
                type="submit"
                className="custom-button">
                Créer
              </button>
            )}
          </div>
        </form>
    </div>
    </div>
  );
}
