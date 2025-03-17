import { RenderMode, ServerRoute } from "@angular/ssr";

export const serverRoutes: ServerRoute[] = [
  { path: "", renderMode: RenderMode.Server },
  { path: "access", renderMode: RenderMode.Prerender },
  { path: "post/create", renderMode: RenderMode.Prerender },
  { path: "post/:id", renderMode: RenderMode.Prerender },
];
