export type User = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type CreatedUser = {
  id: number;
  name: string;
  username: string;
  user_type: string;
  status: string;
};
