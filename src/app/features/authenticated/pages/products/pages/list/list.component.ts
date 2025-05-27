import { ChangeDetectionStrategy, Component, ElementRef, inject, linkedSignal, signal, viewChild } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationResponse } from '@shared/interfaces';
import { PaginationService } from '@shared/service/pagination.service';
import { debounceTime, delay, distinctUntilChanged, filter,  map, merge, Observable, of,  tap } from 'rxjs';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { ProductsResponse } from './interfaces/products.response';
import { BuildUrlService } from './services/build-url.service';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductService } from './services/product.service';
import { DeleteProductModalComponent } from './components/delete-product-modal/delete-product-modal.component';


@Component({
  selector: 'app-list',
  imports: [
    ReactiveFormsModule,
    SearchFormComponent,
    ProductItemComponent,
    DeleteProductModalComponent,
    SkeletonComponent,
    PaginationComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListComponent {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private productService = inject(ProductService);
  private buildUrlService = inject(BuildUrlService);
  private paginationService = inject(PaginationService);

  public payload = signal<Record<string, string> | null>(null);

  private fb = inject(FormBuilder);

  public form = this.fb.group({
    name: [
      this.buildUrlService.defaultValue('name'),
      [Validators.minLength(2), Validators.maxLength(50)]
    ],
    minPrice: [
      this.buildUrlService.defaultValue('minPrice'),
      [Validators.minLength(4), Validators.maxLength(7)]
    ],
    maxPrice: [
      this.buildUrlService.defaultValue('maxPrice'),
      [Validators.minLength(4), Validators.maxLength(7)]
    ],
    category: [this.buildUrlService.defaultValue('category'), Validators.required],
    occasion: [this.buildUrlService.defaultValue('occasion'), Validators.required],
    sort: [this.buildUrlService.defaultValue('sort'), Validators.required],
    size: [this.buildUrlService.defaultValue('size'), Validators.required],
    page: [this.buildUrlService.defaultValue('page'), Validators.required]
  });

  public deleteProductModal = viewChild<DeleteProductModalComponent>('deleteProductModal');
  public productToDelete = signal<{ id: string, confirm: boolean } | null>(null);
  // public lastPayload = signal<Partial<ProductFormPartial | null>>(null);

  public paginationValues = linkedSignal({
    source: () => this.productListRx,
    computation: (source): PaginationResponse | null => {
      if (!source.hasValue() || source.value().content.length === 0) return this.paginationService.emptyPagination();
      if (source.hasValue()) return this.paginationService.getPagination(source.value().pageInformation);
      return this.paginationService.emptyPagination();
    }
  });


  private httpParams = toSignal(
    this.activatedRoute.queryParams.pipe(
      distinctUntilChanged(),
      map(params => ({
        name: params['name'] ?? '',
        minPrice: this.buildUrlService.queryParamPrice(params['minPrice']),
        maxPrice: this.buildUrlService.queryParamPrice(params['maxPrice']),
        category: this.buildUrlService.queryParamCategory(params['category']),
        occasion: this.buildUrlService.queryParamOccasion(params['occasion']),
        sort: this.buildUrlService.queryParamSort(params['sort']),
        size: this.buildUrlService.queryParamSize(params['size']),
        page: this.buildUrlService.queryParamPage(params['page']),
      })),
      tap(params => {
        this.form.patchValue(params, { emitEvent: false });
        const queryParams = this.buildUrlService.cleanParams(params);
        this.payload.set(queryParams)
      })
    )
  )

  private formSignal = toSignal(
    this.form.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(() => this.form.valid),
      tap(params => {
        const queryParams = this.buildUrlService.cleanParams(params);
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams
        });
        this.payload.set(null);
      })
    )
  )

  public productListRx = rxResource({
    request: () => ({ payload: this.payload() }),
    loader: (params): Observable<ProductsResponse> => {
      if (!params.request.payload) return this.productService.emptyProducts();
      return this.productService.searchProducts(params.request.payload);
    }
  })

  public productToDeleteRx = rxResource({
    request: () => ({ payload: this.productToDelete() }),
    loader: ({ request }): Observable<{ deleted: boolean } | null> => {
      if (!request.payload) return of(null);
      if (request.payload.confirm === false) return of(null);
      return this.productService.delete(request.payload.id);
    }
  })


  private openModal(open: boolean) {
    const modal = this.deleteProductModal();
    if (!modal) return;
    modal.openModal(open);
  }

  public toDelete(id: string) {
    this.openModal(true);
    this.productToDelete.set({ id, confirm: false })
  }
  public modalEvent(event: string) {

    if (event === 'close') {
      this.openModal(false);
      this.productToDelete.set(null);
    }
    else if (event === 'delete') {
      this.productToDelete.update((value) => ({
        id: value!.id,
        confirm: true
      }))
    }
    else if (event === 'close-reload') {
      this.openModal(false);
      this.productToDelete.set(null);
      this.productListRx.reload();
    }
    else {
      this.openModal(false);
      this.productToDelete.set(null);
    }

  }

  public resetForm(): void {
    this.form.reset(this.buildUrlService.defaultValues());
  }

  public changePage(page: number) {
    this.form.controls.page.setValue(page.toString());
  }


}
