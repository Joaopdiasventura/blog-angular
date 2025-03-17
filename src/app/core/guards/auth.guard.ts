import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { catchError, map, Observable, of, tap } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  public canActivate(): Observable<boolean> {
    const user = this.authService.currentData;
    if (user) return of(true);
    return this.authService.connectUser().pipe(
      tap((result) => {
        if (!result) this.router.navigate(["access"]);
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }
}
