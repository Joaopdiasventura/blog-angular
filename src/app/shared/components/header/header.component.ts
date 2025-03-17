import { Component, inject, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/auth/auth.service";
import { User } from "../../../core/models/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  public currentUser: User | null = null;

  public isMenuOpen: boolean = false;

  public ngOnInit(): void {
    this.currentUser = this.authService.currentData;
  }

  public goToPage(paths: string[]) {
    this.router.navigate(paths);
  }
}
