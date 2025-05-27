import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, viewChild, viewChildren } from '@angular/core';
import { VerifyComponent } from './components/verify/verify.component';
import { BasicDataComponent } from './components/basic-data/basic-data.component';
import { BasicDataPayload, ImagesPayload, OccasionPayload, ProductPayload, ProductResponse } from './interfaces';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesPayload } from './interfaces/categories.interface';
import { OccasionsComponent } from './components/occasions/occasions.component';
import { ImagesComponent } from './components/images/images.component';
import { PlatformIdService } from '@shared/service/platform-id.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { JsonPipe, NgStyle } from '@angular/common';
import { ProductService } from './services/product.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-add',
  imports: [
    VerifyComponent,
    BasicDataComponent,
    CategoriesComponent,
    OccasionsComponent,
    ImagesComponent,
    RouterLink,
    NgStyle,

  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AddComponent {

  public readonly stepsConfig: string[] = [
    'Verificar',
    'Datos',
    'Categorias',
    'Ocasiones',
    'Fotos y Guardar'
  ];

  private moduleName = viewChild<ElementRef<HTMLParagraphElement>>('moduleName');
  public step = signal<number>(0);
  public progress = computed(()=> ((this.step()) / this.stepsConfig.length) * 100);

  private platformIdService = inject(PlatformIdService);
  private productService = inject(ProductService);

  public shouldResetForm = signal<boolean>(false);

  public payload = signal<ProductPayload | null>(null);
  public productName = signal<string | null>(null);

  private basicDataPayload = signal<BasicDataPayload | null>(null);
  private categoriesPayload = signal<CategoriesPayload | null>(null);
  private occasionsPayload = signal<OccasionPayload | null>(null);
  private imagesPayload = signal<ImagesPayload | null>(null);

  public saveProductRx = rxResource({
    request: () => ({ payload: this.payload() }),
    loader: ({ request }): Observable<ProductResponse | null> => {
      if (!request.payload) return of(null);
      else return this.productService.create(request.payload);
    }
  })

  public goToStep(index: number) {
    this.step.set(index);
    if (this.platformIdService.isBrowser()) {
      setTimeout(()=>{
        this.moduleName()?.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
      },100)
    }
  }

  public verifyNext(name: string): void {
    this.productName.set(name);
    this.goToStep(1);
  }

  public basicDataNext(payload: BasicDataPayload): void {
    this.basicDataPayload.set(payload);
    this.goToStep(2);
  }

  public categoriesNext(payload: CategoriesPayload) {
    this.categoriesPayload.set(payload);
    this.goToStep(3);
  }

  public occasionsNext(payload: OccasionPayload) {
    this.occasionsPayload.set(payload);
    this.goToStep(4);
  }

  public imagesNext(payload: ImagesPayload) {
    this.goToStep(5);
    this.imagesPayload.set(payload);
    this.createPayload();
  }

  public resetAllForms(): void {
    this.goToStep(0);
    if (this.platformIdService.isBrowser()) {
      this.shouldResetForm.set(true);
      setTimeout(() => {
        this.shouldResetForm.set(false);
      },1000)
    }

    this.basicDataPayload.set(null);
    this.categoriesPayload.set(null);
    this.occasionsPayload.set(null);
    this.imagesPayload.set(null);
    this.payload.set(null);
  }


  private createPayload() {
    const payload = this.productService.getPayload(
      this.basicDataPayload(),
      this.categoriesPayload(),
      this.occasionsPayload(),
      this.imagesPayload()
    );
    this.payload.set(payload);
  }

  public onSaveProduct():void{
    this.saveProductRx.reload();
  }

}
