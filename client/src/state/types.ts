import { ApiType } from "@/api";

export interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  picturePath: string;
  friends: Array<string>;
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostsInterface {
  _id: string;
  user: string;
  date: string;
}

export interface AuthInterface {
  mode: "dark" | "light";
  token: string | null;
  posts: PostInterface[];
}

export interface StateInterface {
  persistedReducer: AuthInterface;
  api: ApiType;
}

export interface PostInterface {
  userId: string;
  description: string;
  picturePath: File;
}

export interface VeriyTokenInterface {
  user: UserInterface;
}

export interface FriendInterface {
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
  picturePath: string;
  _id: string;
}
