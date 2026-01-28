import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface SendOtpRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  message?: string;
}
export async function sendLoginOtp(
  data: SendOtpRequest,
): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>(
      "/authentication/login/send-otp",
      data,
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to send OTP");
  }
}
export async function verifyLoginOtp(
  data: VerifyOtpRequest,
): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>(
      "/authentication/login/verify-otp",
      data,
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to verify OTP");
  }
}
