import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { InputComponent } from "../../../shared/components/input/input.component";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { ModalComponent } from "../../../shared/components/modals/modal/modal.component";
import { CreateUserDto } from "../../../shared/dto/user/create-user.dto";
import { LoginUserDto } from "../../../shared/dto/user/login-user.dto";
import { AuthService } from "../../../core/services/auth/auth.service";
import { UserService } from "../../../core/services/user/user.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-access-page",
  imports: [
    LoadingComponent,
    ModalComponent,
    InputComponent,
    ButtonComponent,
    FormsModule,
  ],
  templateUrl: "./access-page.component.html",
  styleUrl: "./access-page.component.scss",
})
export class AccessPageComponent {
  public isInLogin: boolean = true;
  public isLoading: boolean = false;

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  public loginUserDto: LoginUserDto = {
    email: "",
    password: "",
  };

  public createUserDto: CreateUserDto = {
    email: "",
    name: "",
    password: "",
  };

  public modalConfig = {
    isVisible: false,
    title: "",
    children: "",
    onClose: () => {},
  };

  public changeMethod() {
    this.isInLogin = !this.isInLogin;
  }

  public login() {
    if (this.validateEmail(this.loginUserDto.email))
      return document.getElementById("login-email-input")?.focus();
    else if (this.loginUserDto.password.length == 0)
      return document.getElementById("login-password-input")?.focus();

    this.isLoading = true;
    this.userService.login(this.loginUserDto).subscribe({
      next: (result) => {
        this.modalConfig = {
          isVisible: true,
          title: "LOGIN REALIZADO COM SUCESSO",
          children: result.message,
          onClose: () => this.router.navigate([""]),
        };
        localStorage.setItem("token", result.token);
        this.authService.updateData(result.user);
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.modalConfig = {
          isVisible: true,
          title: "ERRO AO REALIZAR O LOGIN",
          children: error.error.message,
          onClose: () =>
            (this.modalConfig = { ...this.modalConfig, isVisible: false }),
        };
        this.isLoading = false;
      },
    });
  }

  public create() {
    if (this.validateEmail(this.createUserDto.email))
      return document.getElementById("create-email-input")?.focus();
    else if (this.createUserDto.name.length == 0)
      return document.getElementById("create-name-input")?.focus();
    else if (this.createUserDto.password.length == 0)
      return document.getElementById("create-password-input")?.focus();

    this.isLoading = true;
    this.userService.create(this.createUserDto).subscribe({
      next: (result) => {
        this.modalConfig = {
          isVisible: true,
          title: "USUÁRIO CRIADO COM SUCESSO",
          children: result.message,
          onClose: () => this.router.navigate([""]),
        };
        localStorage.setItem("token", result.token);
        this.authService.updateData(result.user);
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.modalConfig = {
          isVisible: true,
          title: "ERRO AO CRIAR O USUÁRIO",
          children:
            typeof error.error.message == "string"
              ? error.error.message
              : error.error.message[0],
          onClose: () =>
            (this.modalConfig = { ...this.modalConfig, isVisible: false }),
        };
        this.isLoading = false;
      },
    });
  }

  private validateEmail(email: string): boolean {
    return !/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);
  }
}
