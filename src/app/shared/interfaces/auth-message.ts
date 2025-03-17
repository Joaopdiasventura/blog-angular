import { User } from "../../core/models/user";
import { Message } from "./message";

export interface AuthMessage extends Message {
  token: string;
  user: User;
}
