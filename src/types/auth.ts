export type Credentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  token: string;
  role: "admin" | "buyer" | "seller";
};
