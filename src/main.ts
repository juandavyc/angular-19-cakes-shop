import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { register } from 'swiper/element/bundle';
// enableProdMode()
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

register();
