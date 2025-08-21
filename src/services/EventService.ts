import { IEvent } from "../interfaces/IEvent";
import api from "./api";

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
    try {
      const response = await api.post("/events", data)
      return {
        data: response.data,
        status: response.status
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create event");
    }
  }

  getEventById = async (id: number) => {
    try {
      const response = await api.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get event");
    }
  }

  updateEvent = async (eventId: number, data: IEvent) => {

    // Surement à modifier postérieurement en fonction des éléments qui seront présents en back
    const { creator, id, ...updatedData } = data;

    const formattedData = {
      ...updatedData,
      date: new Date(data.date).toISOString(),
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
    const response = await api.patch(`/events/${id}`, { status: "PUBLISHED" });
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
