import { User } from "./user";

export interface Post {
  id: string;
  title: string;
  content: string;
  user: User;
  createdAt: Date;
}
