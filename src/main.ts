import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { sharedProviders } from "./app/shared/components/shared.module";

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), ...sharedProviders],
});
