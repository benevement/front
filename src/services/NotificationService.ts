import api from "./api";

export default class NotificationService {

    getLastNotif = async () => {
      try {
        const response = await api.get("/notification");
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch events");
      }
    }
  }

  // WORK IN PROGRESS
  