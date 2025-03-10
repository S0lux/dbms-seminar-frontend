export type User = {
  id: string;
  email: string;
  displayName: string;
  profileImage: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type RegisterBody = {
  email: string;
  displayName: string;
  password: string;
};
