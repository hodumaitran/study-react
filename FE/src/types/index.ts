export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
}

export interface IBlog {
  _id: string;
  title: string;
  thumbnail: string;
  content: string;
  author: IUser | string;
  createdAt: string;
}
