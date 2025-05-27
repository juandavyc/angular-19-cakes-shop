import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'skeleton',
  imports: [],
  host:{
    'class': 'flex flex-col gap-3'
  },
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {


 }
