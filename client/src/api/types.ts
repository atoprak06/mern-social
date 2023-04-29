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

export interface AuthInterface {
  mode: "dark" | "light";
  token: string | null;
}

export interface StateInterface {
  persistedReducer: AuthInterface;
  api: ApiType;
}

export interface PostInterface {
  userId: string;
  desription: string;
  picturePath: File;
}

export interface GetPostInterface {
  comments: Array<string>;
  createdAt: string;
  description: string;
  firstName: string;
  lastName: string;
  likes: { [userId: string]: boolean };
  location: string;
  picturePath: string;
  updatedAt: string;
  userId: string;
  userPicturePath: string;
  __v: number;
  _id: string;
}

export interface VerifyTokenInterface {
  user: UserInterface;
}

export interface VerifyTokenQueryInterface {
  skip?: boolean;
  queryKey?: Array<string>;
  force?: boolean;
}

export interface FriendInterface {
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
  picturePath: string;
  _id: string;
}

export interface LoginInterface {
  user: UserInterface;
  token: string;
}

export interface LoginInterfaceUser {
  email: string;
  password: string;
}

export interface CommentInterface {
  _id: string;
  __v: number;
  userId: string;
  updatedAt: string;
  text: string;
  postId: string;
  likes: { [userId: string]: boolean };
  createdAt: string;
}

export interface GetCommentsInterface {
  comments: Array<CommentInterface>;
}
