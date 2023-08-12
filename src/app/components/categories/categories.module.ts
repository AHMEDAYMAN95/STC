import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CategoryComponent } from './category/category.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/Common/material.module';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [CategoryComponent, ProductCardComponent],
  imports: [
    MaterialModule,
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class CategoriesModule { }

// required for AOT compilation
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
