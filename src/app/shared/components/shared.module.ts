// shared/shared.module.ts
import { importProvidersFrom } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

export const sharedProviders = [importProvidersFrom(HttpClientModule)];
