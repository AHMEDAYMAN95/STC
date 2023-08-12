import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { Product } from 'src/app/models/productModel';
import { SharedService } from 'src/app/services/shared.service';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'stc-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(
          '500ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class CategoryComponent implements OnInit {

  title = 'STC Store | Categories';
  categories$!: Observable<string[]>;
  products: Product[] = [];
  selectedCategory: string | null = null;

  constructor(private sharedService: SharedService, public translate: TranslateService, private titleService: Title,
    private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.loadAllProducts();
    this.loadCategories();
  }

  loadCategories() {
    this.categories$ = this.sharedService.getCategories();
  }

  loadAllProducts() {
    this.loaderService.isLoading = true;
    this.sharedService.getProducts().subscribe((products) => {
      this.products = products;
      this.loaderService.isLoading = false;
    });
  }

  loadProductsBySelectedCategory() {
    this.loaderService.isLoading = true;
    this.sharedService.getProductsByCategory(this.selectedCategory as string).subscribe((products) => {
      this.products = products;
      this.loaderService.isLoading = false;
    });
  }

  filterCategories() {
    if (this.selectedCategory) {
      this.loadProductsBySelectedCategory();
    } else {
      this.loadAllProducts();
    }
  }

}
