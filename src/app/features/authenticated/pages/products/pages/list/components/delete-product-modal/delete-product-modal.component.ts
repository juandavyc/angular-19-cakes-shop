import { ChangeDetectionStrategy, Component, ElementRef, input, output, ResourceRef, viewChild } from '@angular/core';


@Component({
  selector: 'delete-product-modal',
  imports: [],
  templateUrl: './delete-product-modal.component.html',
  styleUrl: './delete-product-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteProductModalComponent {

  private confirmToDeleteModal = viewChild<ElementRef<HTMLDialogElement>>('confirmToDeleteModal');

  public productToDeleteRx = input.required<ResourceRef<{ deleted: boolean; } | null | undefined>>();

  public modalEvent = output<string>();

  public openModal(open: boolean): void {
    const modal = this.confirmToDeleteModal();
    if (!modal) return;
    if (open) {
      modal.nativeElement.showModal();
      return;
    };
    modal.nativeElement.close();
  }

}
