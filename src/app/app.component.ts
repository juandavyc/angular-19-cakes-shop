import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import AOS from 'aos';
import { PlatformIdService } from './shared/service/platform-id.service';



@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    //AppCartDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'pasteleria-jb-ssr';

  public isLoading = signal<boolean>(true);

  private platformIdService = inject(PlatformIdService);

  ngOnInit(): void {

    if (this.platformIdService.isBrowser()) {

      AOS.init({
        duration: 700,
      });

      window.addEventListener('DOMContentLoaded', () => {
        this.isLoading.set(false);
      });
    }

  }

}
