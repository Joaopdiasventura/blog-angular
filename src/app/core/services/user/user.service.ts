import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../../models/user";
import { CreateUserDto } from "../../../shared/dto/user/create-user.dto";
import { LoginUserDto } from "../../../shared/dto/user/login-user.dto";
import { AuthMessage } from "../../../shared/interfaces/auth-message";

declare const API_URL: string;

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = API_URL + "/user";
  private http = inject(HttpClient);

  public create(createUserDto: CreateUserDto) {
    return this.http.post<AuthMessage>(this.apiUrl, createUserDto);
  }

  public login(loginUserDto: LoginUserDto) {
    return this.http.post<AuthMessage>(this.apiUrl + "/login", loginUserDto);
  }

  public decodeToken(token: string) {
    return this.http.get<User>(`${this.apiUrl}/${token}`);
  }
}
