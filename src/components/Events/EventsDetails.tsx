import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventService from "../../services/EventService";
import { IEvent } from "../../interfaces/IEvent";

const eventService = new EventService();


export default function EventDetailsView() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<IEvent | null>(null);


  // Récupération de l'événement existant
 useEffect(() => {
    if (id) {
      const numericId = parseInt(id);
      eventService.getEventById(numericId)
        .then((data) => {
          // formatage de la date
          const formattedDate = new Date(data.date).toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          setEvent({
            ...data,
            date: formattedDate,
          });
        })
        .catch(() => setError("Impossible de récupérer l'événement"));
    }
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!event) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-xl bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Détails de l'événement</h2>

        <div className="space-y-4">
          {/* Nom */}
          <div>
            <p className="text-sm font-medium text-gray-900">Nom</p>
            <p className="mt-1 text-gray-700">{event.name}</p>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm font-medium text-gray-900">Description</p>
            <p className="mt-1 text-gray-700">{event.description}</p>
          </div>

          {/* Adresse */}
          {event.address && (
            <div>
              <p className="text-sm font-medium text-gray-900">Adresse</p>
              <p className="mt-1 text-gray-700">
                {event.address.street_number} {event.address.street_name}, {event.address.zip_code} {event.address.city}
              </p>
            </div>
          )}

          {/* Date */}
          <div>
            <p className="text-sm font-medium text-gray-900">Date</p>
            <p className="mt-1 text-gray-700">{event.date}</p>
          </div>

          {/* Volontaires nécessaires */}
          <div>
            <p className="text-sm font-medium text-gray-900">Volontaires nécessaires</p>
            <p className="mt-1 text-gray-700">{event.volunteers_needed}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
