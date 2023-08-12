import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/productModel';

@Component({
  selector: 'stc-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: Product | null = null;

  roundRate(count: number) {
    return Math.round(count);
  }
}
