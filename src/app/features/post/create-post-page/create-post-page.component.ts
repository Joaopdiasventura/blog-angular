import { Component, inject, OnInit } from "@angular/core";
import { CreatePostDto } from "../../../shared/dto/post/create-post.dto";
import { User } from "../../../core/models/user";
import { AuthService } from "../../../core/services/auth/auth.service";
import { PostService } from "../../../core/services/post/post.service";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { InputComponent } from "../../../shared/components/input/input.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { FormsModule } from "@angular/forms";
import { TextAreaComponent } from "../../../shared/components/text-area/text-area.component";
import { ModalComponent } from "../../../shared/components/modals/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-post-page",
  imports: [
    FormsModule,
    LoadingComponent,
    ModalComponent,
    HeaderComponent,
    InputComponent,
    TextAreaComponent,
    ButtonComponent,
  ],
  templateUrl: "./create-post-page.component.html",
  styleUrl: "./create-post-page.component.scss",
})
export class CreatePostPageComponent implements OnInit {
  public currentUser: User | null = null;

  public isLoading: boolean = false;

  public createPostDto: CreatePostDto = {
    title: "",
    content: "",
    userEmail: "",
  };

  public modalConfig = {
    isVisible: false,
    title: "",
    children: "",
    onClose: () => {},
  };

  private authService = inject(AuthService);
  private postService = inject(PostService);
  private router = inject(Router);

  public ngOnInit(): void {
    this.authService.connectUser().subscribe((user) => this.loadData(user));
  }

  public createPost() {
    this.isLoading = true;
    this.postService.create(this.createPostDto).subscribe({
      next: (result) => {
        this.modalConfig = {
          isVisible: true,
          title: "SUCESSO",
          children: result.message,
          onClose: () => this.router.navigate(["../"]),
        };
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.modalConfig = {
          isVisible: true,
          title: "ERRO",
          children: error.error.message,
          onClose: () =>
            (this.modalConfig = { ...this.modalConfig, isVisible: false }),
        };
        this.isLoading = false;
      },
    });
  }

  private loadData(user: User | null) {
    this.currentUser = user;
    if (!user) return;
    this.createPostDto.userEmail = user.email;
  }
}
