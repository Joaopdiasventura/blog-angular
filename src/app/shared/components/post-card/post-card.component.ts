import { Component, inject, Input } from "@angular/core";
import { Post } from "../../../core/models/post";
import { Router } from "@angular/router";

@Component({
  selector: "post-card",
  imports: [],
  templateUrl: "./post-card.component.html",
  styleUrls: ["./post-card.component.scss"],
})
export class PostCardComponent {
  @Input() public post!: Post;

  private router = inject(Router);

  public goToPost() {
    this.router.navigate(["post", this.post.id]);
  }
}
