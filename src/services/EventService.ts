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
      return response.data
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

  updateEvent = async (id:number, data: IEvent) => {
    try {
      const response = await api.patch(`/events/${id}`, data);
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

}
