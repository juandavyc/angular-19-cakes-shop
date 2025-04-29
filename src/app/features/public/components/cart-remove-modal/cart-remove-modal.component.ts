import { ChangeDetectionStrategy, Component, ElementRef, output, viewChild } from '@angular/core';

@Component({
  selector: 'cart-remove-modal',
  imports: [],
  templateUrl: './cart-remove-modal.component.html',
  styleUrl: './cart-remove-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartRemoveModalComponent {


  private cartRemoveModal = viewChild<ElementRef<HTMLDialogElement>>('cartRemoveModal');

  public removeConfirm = output<void>();

  public openModal(open: boolean): void {

    const modal = this.cartRemoveModal();
    if (!modal) return;
    if (open) modal.nativeElement.showModal();
    else modal.nativeElement.close();

  }

  public confirmProductRemoval() {
    this.removeConfirm.emit();
    this.openModal(false);
  }

}
