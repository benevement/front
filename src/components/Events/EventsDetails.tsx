import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventService from "../../services/EventService";
import { IEvent } from "../../interfaces/IEvent";
import { AddressInterface } from "../../interfaces/IAddress";
import { formatDateFR } from "../../utils/formatDate";
import { useAuthStore } from "../../stores/useAuthStore";
import { FiCalendar, FiMapPin } from "react-icons/fi";

const eventService = new EventService();

export default function EventDetailsView() {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<IEvent | null>(null);
  const [address, setAddress] = useState<AddressInterface | null>(null);
  const { user } = useAuthStore() || {};

  // Récupération de l'événement existant
 useEffect(() => {
  const fetchEvent = async () => {
    if (!id) return;

    try {
      const numericId = parseInt(id);

      // Appel centralisé qui récupère event + address
      const eventWithAddress = await eventService.getEventWithAddressById(numericId);

      setEvent({
        ...eventWithAddress,
        event_date: formatDateFR(eventWithAddress.event_date),
        end_invitation_date: formatDateFR(eventWithAddress.end_invitation_date),
      });

      // Si tu veux garder un state séparé pour l'adresse
      setAddress(eventWithAddress.address || null);

    } catch (err) {
      console.error(err);
      setError("Impossible de récupérer l'événement");
    }
  };

  fetchEvent();
}, [id]);


  if (error) return <p>{error}</p>;
  if (!event) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen px-4 py-6 flex flex-col items-center">

      {/* Header avec nom de l'événement et bouton retour */}
      <div className="w-full max-w-xl flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/events")}
          className="custom-small-button"
        >
          ← Retour
        </button>
      </div>
      {/* Nom de l'événement */}
      <div>
        <h2 className="text-2xl text-center mb-4">{event.name}</h2>
      </div>

      {/* Carte événement */}
      <div className="w-full max-w-xl custom-back-color rounded-lg shadow-lg m-6 p-3 custom-border relative">

        {/* Date de l'événement en haut à droite */}
        <div className="absolute top-4 right-4 text-white font-medium">
          <FiCalendar className="mr-1" />
          {(event as any).event_date}
        </div>

        <div className="space-y-4">
          {/* Adresse */}
           {address && (
              <div className="text-white mt-6">
                <FiMapPin className="mr-2 text-white" />
                {address.street_number} {address.street_name}, {address.zip_code} {address.city}
              </div>
            )}
          {/* Description */}
          <div>
            <p className="text-white">{event.description}</p>
          </div>

          {/* Champs réservés aux admin/bénévole */}
          {(user?.role === "admin" || user?.role === "volunteer") && (
            <>
              <div className="text-sm text-white">
                <span className="font-medium">Fin des inscriptions : </span>
                {(event as any).end_invitation_date}
              </div>

              <div className="text-sm text-white">
                <span className="font-medium">Volontaires nécessaires : </span>
                {event.volunteers_needed}
              </div>
            </>
          )}


        </div>
      </div>
       {/* Bouton visible uniquement pour les bénévoles */}
          {user?.role === "volunteer" && (
            <button className="custom-button">
              Participer
            </button>
          )}

           {user?.role === "admin" && (
            <button
              onClick={() => navigate(`/events/${id}/edit`)}
              className="custom-button mt-4"
            >
              Modifier l'événement
            </button>
          )}
    </div>
  );
}
