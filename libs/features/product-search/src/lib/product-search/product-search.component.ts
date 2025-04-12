import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-product-search',
  imports: [CommonModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSearchComponent {}
