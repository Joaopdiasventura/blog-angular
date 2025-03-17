import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";
import { User } from "../../models/user";
import { UserService } from "../user/user.service";
import { isPlatformServer } from "@angular/common";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private userService = inject(UserService);
  private router = inject(Router);

  private userDataSource = new BehaviorSubject<User | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public get currentData() {
    return this.userDataSource.value;
  }

  public updateData(data: User) {
    this.userDataSource.next(data);
  }

  public connectUser(): Observable<User | null> {
    if (this.currentData) return of(this.currentData);

    if (isPlatformServer(this.platformId)) return of(null);

    const token = localStorage.getItem("token");
    if (!token) return of(null);

    this.loadingSubject.next(true);

    return this.userService.decodeToken(token).pipe(
      tap((user) => this.updateData(user)),
      map((user) => {
        this.loadingSubject.next(false);
        return user;
      }),
      catchError(() => {
        this.loadingSubject.next(false);
        this.router.navigate(["access"]);
        return of(null);
      })
    );
  }

  public get loading$() {
    return this.loadingSubject.asObservable();
  }
}
