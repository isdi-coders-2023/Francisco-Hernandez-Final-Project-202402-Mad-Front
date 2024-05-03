import { Project } from '../projects.models/projects.models';

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  imageUrl?: string;
  projects: Project[];
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserCreateDto = {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
};
