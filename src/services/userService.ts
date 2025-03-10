import { API_URL } from "../utils/constants.ts";
import { User } from "../types/user.ts";

const getUserById = async (userId: string): Promise<User> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

const getAllUsers = async (): Promise<User[]> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export default {
  getUserById,
  getAllUsers,
};
