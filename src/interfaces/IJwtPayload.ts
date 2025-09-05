import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  address_id: number | null;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Erreur de décodage du token:", error);
    return null;
  }
}
