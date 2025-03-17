import { RenderMode, ServerRoute } from "@angular/ssr";

export const serverRoutes: ServerRoute[] = [
  { path: "", renderMode: RenderMode.Prerender },
  { path: "access", renderMode: RenderMode.Server },
  { path: "post/create", renderMode: RenderMode.Server },
  { path: "post/:id", renderMode: RenderMode.Prerender },
];
