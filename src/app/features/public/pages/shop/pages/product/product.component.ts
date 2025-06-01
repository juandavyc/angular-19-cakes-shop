import { DatePipe, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, linkedSignal, signal, } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink, } from '@angular/router';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { SocialShareComponent } from '@shared/components/social-share/social-share.component';
import { map, Observable, tap } from 'rxjs';
import { PlatformIdService } from '@shared/service/platform-id.service';
import { CartService } from '@public/pages/cart/services/cart.service';
import { CONTACT_US } from '@core/configs/contact-us/contact-us.config';
import { NoResultsComponent } from '@shared/components/no-results/no-results.component';
import { SaveUrlService } from '@public/services/save-url.service';
import { PRODUCT_CONFIG } from './configs/product.config';
import { ProductService } from './service/product.service';
import { OrderedNameComponent } from './components/ordered-name/ordered-name.component';
import { CarouselImagesComponent } from './components/carousel-images/carousel-images.component';
import { OccasionsComponent } from './components/occasions/occasions.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PriceComponent } from './components/price/price.component';
import { ProductResponse } from './interfaces/product-response.interface';
import { RatingComponent } from './components/rating/rating.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { SeoService } from '@core/services/seo.service';



@Component({
  selector: 'app-by-slug',
  imports: [
    HeroTitleComponent,
    SocialShareComponent,
    // TitleComponent,
    OrderedNameComponent,
    CarouselImagesComponent,
    //PurshaseControlsComponent,
    OccasionsComponent,
    CategoriesComponent,
    PriceComponent,
    RatingComponent,
    SkeletonComponent,
    NoResultsComponent,
    RouterLink,

    DatePipe,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {

  private seo = inject(SeoService);

  public readonly title = PRODUCT_CONFIG.title;
  public readonly subtitle = PRODUCT_CONFIG.subtitle;

  private router = inject(Router);

  public previousUrl = signal<string | null>('/shop');

  private platformIdService = inject(PlatformIdService);

  private productService = inject(ProductService);

  private cartService = inject(CartService);
  private activatedRoute = inject(ActivatedRoute);

  private saveUrlService = inject(SaveUrlService);

  private queryRouter = toSignal(
    this.activatedRoute.paramMap.pipe(
      map(param => param.get('slug') ?? ''),
    ), { initialValue: '' }
  )

  constructor() {
    effect(() => {
      const productStatus = this.productRxResource;
      if (productStatus.error()) {
        this.seo.setSeoMetadata(PRODUCT_CONFIG.seo)
      }
      if (productStatus.hasValue() && productStatus.value() !== null) {
        const product = productStatus.value();
        this.seo.setSeoMetadata({
          title: `${product.name} | Pastelería JB`,
          description: product.description,
          tags: PRODUCT_CONFIG.tags,
          image: product.cover,
        })
      }
    })

  }

  public productRxResource = rxResource({
    request: () => ({ slug: this.queryRouter() }),
    loader: ({ request }): Observable<ProductResponse | undefined> => {
      return this.productService.getBySlug(request.slug);
    }
  });


  // public addToCart(product: Product) {
  //   this.cartService.addProduct(product);
  // }

  public goToShop(): void {
    this.router.navigateByUrl(this.saveUrlService.getUrl())
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
