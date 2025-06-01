import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { CONTACT_US } from '@core/configs/contact-us/contact-us.config';
import { PlatformIdService } from '@shared/service/platform-id.service';


@Component({
  selector: 'purshase-controls',
  imports: [],
  templateUrl: './purshase-controls.component.html',
  styleUrl: './purshase-controls.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurshaseControlsComponent {

  private router = inject(Router);
  public addToCartOutput = output<void>();
  private platformIdService = inject(PlatformIdService);


  // public buyProduct(): void {
  //   if (product) {
  //     console.log("id:", product);
  //   }
  // }

  public addToCart() {
    this.addToCartOutput.emit();
  }

  public sendWhatsapp(slug: string) {
    if (!this.platformIdService.isBrowser) return;

    const url = location.origin + this.router.serializeUrl(
      this.router.createUrlTree(['/product', slug])
    );
    const encodedMessage = encodeURIComponent(`Hola, ¿Sigue estando disponible este artículo? - ${url}`);
    const waUrl = `https://wa.me/${CONTACT_US.number}?text=${encodedMessage}`;

    window.open(waUrl, '_blank');
  }
}
