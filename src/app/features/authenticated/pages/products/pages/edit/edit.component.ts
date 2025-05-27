import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { PlatformIdService } from '@shared/service/platform-id.service';
import { BasicDataFormComponent } from './components/basic-data-form/basic-data-form.component';
import { ProductService } from './services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, of, tap } from 'rxjs';
import { ProductData } from './interfaces/product-data.interface';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { OccasionsFormComponent } from './components/occasions-form/occasions-form.component';
import { ImagesFormComponent } from './components/images-form/images-form.component';

const SCROLL_CONFIG: ScrollIntoViewOptions = { behavior: "smooth", block: "start" };

@Component({
  selector: 'app-edit',
  imports: [
    BasicDataFormComponent,
    CategoriesFormComponent,
    OccasionsFormComponent,
    ImagesFormComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditComponent {

  private platformidService = inject(PlatformIdService);
  private service = inject(ProductService);

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);


  private paramRouter = toSignal(
    this.activatedRoute.paramMap.pipe(
      map((param) => param.get('id') ?? null),
      tap(id => {
        if (!id) this.router.navigate(['products'])
      }),
    ), { initialValue: null }
  )

  public productRx = rxResource({
    request: () => ({ id: this.paramRouter() }),
    loader: ({ request }): Observable<ProductData | null> => {
      if (!request.id) return of(null);
      else return this.service.getProductById(request.id);
    }
  });


  public scrollTo(container: HTMLDivElement) {
    if (!this.platformidService.isBrowser()) return;
    container.scrollIntoView(SCROLL_CONFIG);
  }

}
