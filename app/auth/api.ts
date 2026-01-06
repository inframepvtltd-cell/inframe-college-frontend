import axios from "axios";

const baseURL = `http://localhost:7000/api/v1`

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    activeStatus: boolean;
  };
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  activeStatus: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: AuthUser;
}

export const signupApi = async (
  payload: SignupPayload
): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>(`${baseURL}/authentication/signup`, payload);
  return data;
};

/* ---------- APIs ---------- */
export const loginApi = async (payload: any): Promise<AuthResponse> => {
  const { data } = await axios.post(
    `${baseURL}/authentication/login`,
    payload
  );

  return data;
};
