import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventService from "../../services/EventService";
import { IEvent } from "../../interfaces/IEvent";

const eventService = new EventService();

export default function EventsList() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    eventService.getEvents()
      .then((data) => {
        const formattedEvents = data.map((e: IEvent) => {
          const eventDate = new Date(e.event_date);
          const endInvitationDate = new Date(e.end_invitation_date);

          return {
            ...e, // Event avec MAJ de la date formatée
            event_date: eventDate.toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            end_invitation_date: endInvitationDate.toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          };
        });

        setEvents(formattedEvents);
      })
      .catch(() => setError("Impossible de récupérer les événements"));
  }, []);

  if (error) return <p>{error}</p>;
  if (events.length === 0) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 bg-gray-50 space-y-4">

      {/* Bouton retour en haut */}
      <div className="w-full max-w-xl mb-4">
        <button
          onClick={() => navigate('/')}
          className="custom-small-button"
        >
          ← Retour
        </button>
      </div>

      {events.map((event) => (
        <div
          key={event.id}
          className="w-full max-w-xl bg-white rounded-2xl p-4 hover:shadow-lg cursor-pointer transition flex flex-col custom-border"
          onClick={() => navigate(`/events/${event.id}`)}
        >
          {/* En-tête avec nom et date */}
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-gray-900">{event.name}</h2>
            <span className="text-sm text-gray-500">{event.event_date}</span>
          </div>

          <p className="text-gray-700 mb-2">{event.description}</p>

          {event.address && (
            <p className="text-gray-700 mb-2">
              {event.address.street_number} {event.address.street_name}, {event.address.zip_code} {event.address.city}
            </p>
          )}

          <p className="text-gray-700 mb-1">Volontaires nécessaires : {event.volunteers_needed}</p>
          <p className="text-gray-700 text-sm">Fin des inscriptions bénévoles : {event.end_invitation_date}</p>
        </div>
      ))}
    </div>
  );
}
