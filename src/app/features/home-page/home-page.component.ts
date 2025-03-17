import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { AuthService } from "./../../core/services/auth/auth.service";
import { PostService } from "../../core/services/post/post.service";
import { User } from "../../core/models/user";
import { Post } from "../../core/models/post";
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { HeaderComponent } from "../../shared/components/header/header.component";
import { PostCardComponent } from "../../shared/components/post-card/post-card.component";
import { ButtonComponent } from "../../shared/components/button/button.component";

@Component({
  selector: "app-home-page",
  imports: [
    LoadingComponent,
    HeaderComponent,
    PostCardComponent,
    ButtonComponent,
  ],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.scss",
})
export class HomePageComponent implements OnInit {
  public currentUser: User | null = null;
  public posts: Post[] = [];

  public isLoading: boolean = false;

  public page: number = 0;

  private authService = inject(AuthService);
  private postService = inject(PostService);

  public ngOnInit(): void {
    this.authService.connectUser().subscribe((user) => this.loadData(user));
  }

  private loadData(user: User | null) {
    this.currentUser = user;
    this.loadPosts();
  }

  public loadPosts() {
    this.isLoading = true;
    this.postService.findByOrder(this.page).subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts.push(...posts);
      this.page++;
    });
  }
}
