// src/services/AddressService.ts
import api from "./api";
import { AddressInterface } from "../interfaces/IAddress";


export default class AddressService {

  getAddresses = async (): Promise<AddressInterface[]> => {
    try {
      const response = await api.get("/address");
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch addresses");
    }
  }

  getAddressById = async (id: number): Promise<AddressInterface> => {
    try {
      const response = await api.get(`/address/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get address");
    }
  }

  createAddress = async (data: AddressInterface) => {
    try {
      const response = await api.post("/address", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create address");
    }
  }

  updateAddress = async (id: number, data: AddressInterface) => {
    try {
      const response = await api.patch(`/address/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update address");
    }
  }

  deleteAddress = async (id: number) => {
    try {
      const response = await api.delete(`/address/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete address");
    }
  }
}
