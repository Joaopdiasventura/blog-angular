import { Component, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LoadingComponent } from "./shared/components/loading/loading.component";
import { AuthService } from "./core/services/auth/auth.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

  public isLoading: boolean = false;

  public ngOnInit(): void {
    this.authService.loading$.subscribe((loading: boolean) =>
      setTimeout(() => (this.isLoading = loading), 0)
    );
  }
}
