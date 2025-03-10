export type User = {
  id: string;
  username: string;
  role: "admin" | "buyer" | "seller";
  createdAt: string;
  token?: string;
};
