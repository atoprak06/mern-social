import { UserInterface } from "./../state/types";
export interface LoginInterface {
  user: UserInterface;
  token: string;
}

export interface LoginInterfaceUser {
  email: string;
  password: string;
}
