import { API_URL } from "../utils/constants.ts";
import { Credentials, LoginResponse } from "../types/auth.ts";
import { User } from "../types/user.ts";
import { ErrorResponse } from "../types/error.ts";

const login = async (
  credentials: Credentials
): Promise<LoginResponse | ErrorResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      message: data.message ?? "An error occurred",
      error: response.status === 401 ? "Invalid credentials" : data.error,
      statusCode: response.status,
    };
  }

  return data as LoginResponse;
};

const register = async (
  credentials: Credentials
): Promise<User | ErrorResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
      role: "seller",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      message: data.message ?? "An error occurred",
      error: response.status === 404 ? "User already created" : data.error,
      statusCode: response.status,
    };
  }

  return data as User;
};

export default {
  login,
  register,
};
