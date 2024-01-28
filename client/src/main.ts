import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: 'config', useValue: appConfig },
    importProvidersFrom(AppRoutingModule),
    importProvidersFrom(HttpClientModule),
  ],
}).catch((err) => console.error(err));
