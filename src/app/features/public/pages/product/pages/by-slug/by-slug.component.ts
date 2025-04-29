import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, linkedSignal, } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, } from '@angular/router';
import { ASSETS } from '@core/assets';
import { Product } from '@public/pages/shop/interfaces';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { SocialShareComponent } from '@shared/components/social-share/social-share.component';
import { map, Observable } from 'rxjs';
import { CarouselImagesComponent } from '../../components/carousel-images/carousel-images.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { CoverImageComponent } from '../../components/cover-image/cover-image.component';
import { OccasionsComponent } from '../../components/occasions/occasions.component';
import { OrderedNameComponent } from '../../components/ordered-name/ordered-name.component';
import { PriceComponent } from '../../components/price/price.component';
import { PurshaseControlsComponent } from '../../components/purshase-controls/purshase-controls.component';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { ProductService } from '../../service/product.service';
import { PlatformIdService } from '@shared/service/platform-id.service';
import { CartService } from '@public/pages/cart/services/cart.service';
import { PRODUCT_CONFIG } from '../../configs/product.config';



@Component({
  selector: 'app-by-slug',
  imports: [
    HeroTitleComponent,
    SocialShareComponent,
    // TitleComponent,
    OrderedNameComponent,
    CoverImageComponent,
    CarouselImagesComponent,
    PurshaseControlsComponent,
    OccasionsComponent,
    CategoriesComponent,
    PriceComponent,
  ],
  templateUrl: './by-slug.component.html',
  styleUrl: './by-slug.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BySlugComponent {

  public readonly title = PRODUCT_CONFIG.title;
  public readonly subtitle = PRODUCT_CONFIG.subtitle;

  private platformIdService = inject(PlatformIdService);
  private location = inject(Location);

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private activatedRoute = inject(ActivatedRoute);

  public selectedImage = linkedSignal({
    source: () => this.productRxResource,
    computation: (source) => {
      if (source.hasValue()) {
        return source.value().cover;
      }
      return ASSETS.NO_IMAGE;
    }
  });

  private queryRouter = toSignal(
    this.activatedRoute.paramMap.pipe(
      map(param => param.get('slug') ?? ''),
    ), { initialValue: '' }
  )

  public productRxResource = rxResource({
    request: () => ({ slug: this.queryRouter() }),
    loader: ({ request }): Observable<ProductResponse | undefined> => {
      return this.productService.getBySlug(request.slug);
    }
  });

  public changeImage(url: string): void {
    this.selectedImage.set(url);
  }

  public addToCart(product: Product){
    this.cartService.addProduct(product);
  }

  goBack() {
    if (this.platformIdService.isBrowser()) {
      this.location.back();
    }
  }

}
