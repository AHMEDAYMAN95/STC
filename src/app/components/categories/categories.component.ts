import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ProductData } from 'src/app/models/userModel';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'stc-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  title = 'STC Store | Categories';
  allProducts: ProductData[] = [];

  constructor(private sharedService: SharedService, public translate: TranslateService, private titleService: Title) {
  }

  ngOnInit() {
    this.getAllProduct();
    this.titleService.setTitle(this.title);
  }

  getAllProduct() {
    this.sharedService.get('https://fakestoreapi.com/products').subscribe(dataProduct => {
      this.allProducts = dataProduct;
    })
  }

  addToCart() { }

  remove(item): void {
  }

}
