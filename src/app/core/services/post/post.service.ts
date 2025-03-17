import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Post } from "../../models/post";
import { CreatePostDto } from "../../../shared/dto/post/create-post.dto";
import { Message } from "../../../shared/interfaces/message";

declare const API_URL: string;

@Injectable({
  providedIn: "root",
})
export class PostService {
  private apiUrl = API_URL + "/post";
  private http = inject(HttpClient);

  public create(createPostDto: CreatePostDto) {
    return this.http.post<Message>(this.apiUrl, createPostDto);
  }

  public findById(id: string) {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  public findByOrder(page: number) {
    return this.http.get<Post[]>(`${this.apiUrl}/findByOrder/${page}`);
  }
}
