import { JsonPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { map, Observable, of, tap } from 'rxjs';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { ProductTitleSubtitle } from '../../interfaces/product-title-subtitle.interface.ts';
import { ASSETS } from '@core/assets';
import { url } from 'inspector';

@Component({
  selector: 'app-by-slug',
  imports: [
    HeroTitleComponent,
    RouterLink,
    TitleCasePipe,
    JsonPipe
  ],
  templateUrl: './by-slug.component.html',
  styleUrl: './by-slug.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BySlugComponent {

  // plataform id
  private productUrl = signal<string>('');

  public socialNetworks = new Map<string, string>([
    ['facebook', 'https://www.facebook.com/sharer/sharer.php?u=']
  ]);

  public SOCIAL_NETWORKS = {
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
    instagram: 'https://www.facebook.com/sharer/sharer.php?u=',
    x: 'https://www.facebook.com/sharer/sharer.php?u=',
  }

  public selectedImage = linkedSignal({
    source: () => this.productRxResource,
    computation: (source) => {
      if (source.hasValue()) {
        return source.value().cover;
      }
      return ASSETS.NO_IMAGE;
    }
  })


  // public title = computed<ProductTitleSubtitle>(() => {

  //   const productRx = this.productRxResource;
  //   if (productRx.hasValue()) {
  //     const product = productRx.value();
  //     const title = product.name;
  //     const subtitle = product.productCategories
  //       .map(cat => cat.category.name)
  //       .join(', ');
  //     return { title, subtitle };
  //   }
  //   if (productRx.error()) {
  //     return { title: 'Error', subtitle: 'Ocurrio un error' };
  //   }
  //   return { title: 'Cargando', subtitle: 'Cargando' };
  // })


  private productService = inject(ProductService);

  private activatedRoute = inject(ActivatedRoute);

  private queryRouter = toSignal(

    this.activatedRoute.paramMap.pipe(
      map(param => param.get('slug') ?? ''),
      tap(console.log)
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


  public sharedOn(socialNetwork: string) {


    // const url = `${this.socialNetworks.get(socialNetwork)}https://fontawesome.com/v6/search`;
    // window.open(url, '_blank');
    // plataform id

  }


}
