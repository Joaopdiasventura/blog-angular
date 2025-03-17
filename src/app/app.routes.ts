import { Routes } from "@angular/router";
import { HomePageComponent } from "./features/home-page/home-page.component";
import { AccessPageComponent } from "./features/user/access-page/access-page.component";
import { CreatePostPageComponent } from "./features/post/create-post-page/create-post-page.component";
import { FindPostPageComponent } from "./features/post/find-post-page/find-post-page.component";

export const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "access", component: AccessPageComponent },
  { path: "post/create", component: CreatePostPageComponent },
  { path: "post/:id", component: FindPostPageComponent },
];
