import { IEvent } from "../interfaces/IEvent";
import api from "./api";
import { AddressInterface } from "../interfaces/IAddress";
import AddressService from "./AddressService";

export default class EventService {

  getEvents = async () => {
    try {
      const response = await api.get("/events");
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch events");
    }
  }

  createEvent = async (data: IEvent) => {

     const eventData = {
      ...data,
      event_date: new Date(data.event_date).toISOString(),
      end_invitation_date: new Date(data.end_invitation_date).toISOString(),
      volunteers_needed: Number(data.volunteers_needed),
      max_participants: Number(data.max_participants),
    };

    try {
      console.log("data envoyée au service", eventData)
      const response = await api.post("/events", eventData)
      return {
        data: response.data,
        status: response.status
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create event");
    }
  }

  getEventWithAddressById = async (id: number): Promise<IEvent & { address?: AddressInterface }> => {
    try {
      const response = await api.get(`/events/${id}`);
      const event = response.data;

      let address = undefined;
      if (event.addressId) {
        address = await new AddressService().getAddressById(event.addressId);
      }

      return {
        ...event,
        address,
      };
    } catch (error) {
      console.error("Failed to get event with address", error);
      throw new Error("Failed to get event with address");
    }
  }

  updateEvent = async (eventId: number, data: IEvent) => {

    // Surement à modifier postérieurement en fonction des éléments qui seront présents en back
    const { created_by_id, id, addressId, creator, ...updatedData } = data;

    const formattedData = {
      ...updatedData,
      address: data.address,
      event_date: new Date(data.event_date).toISOString(),
      end_invitation_date: new Date(data.end_invitation_date).toISOString(),
      invited_volunteers: data.invited_volunteers.map(v => (typeof v === 'number' ? v : v.id)),
    };

    console.log("data a envoyer", formattedData);
    try {
      const response = await api.patch(`/events/${eventId}`, formattedData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update event");

    }
  }

  deleteEvent = async (id: number) => {
    try {
      const response = await api.delete(`/events/${id}`);
      return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete event");
    }
  }

  publishEvent = async (id: number) => {
  try {
    const response = await api.patch(`/events/${id}`, { status: "published" });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to publish event");
  }
}

  getEventByUser = async (id: number) => {
    try {
      const response = await api.get(`/events/creator/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete event");
    }
  }

  getEventByUserAndStatus = async (userId: number, status: string) => {
    try {
      const response = await api.get(`/events/user/${userId}/events/status/${status}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch events by user and status");
    }
  }
}
