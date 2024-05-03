export type UserLogin = {
  username: string;
  password: string;
};

export type UserCreate = {
  username:string
  email: string;
  password: string;
  imageUrl: string
};

export type User = {
  id: string
  username: string
  email: string;
  password: string
  imageUrl: string;
  // projects: Projects[]
}
