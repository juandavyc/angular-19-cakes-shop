import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'http-error',
  imports: [],
  templateUrl: './http-error.component.html',
  styleUrl: './http-error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpErrorComponent { }
