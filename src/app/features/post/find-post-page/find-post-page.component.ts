import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth/auth.service";
import { PostService } from "../../../core/services/post/post.service";
import { User } from "../../../core/models/user";
import { Post } from "../../../core/models/post";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";

@Component({
  selector: "app-find-post-page",
  imports: [HeaderComponent, ButtonComponent],
  templateUrl: "./find-post-page.component.html",
  styleUrl: "./find-post-page.component.scss",
})
export class FindPostPageComponent implements OnInit {
  public currentUser: User | null = null;
  public currentPost: Post | null = null;
  private id: string = "";

  private authService = inject(AuthService);
  private postService = inject(PostService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") as string;
    this.authService.connectUser().subscribe((user) => this.loadData(user));
  }

  public formatDate(date: Date): string {
    date = new Date(date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }

  public goBack() {
    this.router.navigate([""]);
  }

  private loadData(user: User | null) {
    this.currentUser = user;
    this.findPost();
  }

  private findPost() {
    this.postService.findById(this.id).subscribe({
      next: (post) => (this.currentPost = post),
      error: () => this.router.navigate([""]),
    });
  }
}
