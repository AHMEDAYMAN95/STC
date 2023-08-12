import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProductRoutingModule } from './product-routing.module';
import { MaterialModule } from 'src/app/Common/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './products/products.component';
import { ProductAddEditDialogComponent } from './product-add-edit-dialog/product-add-edit-dialog.component';
import { ProductDeleteDialogComponent } from './product-delete-dialog/product-delete-dialog.component';

@NgModule({
  declarations: [ProductComponent, ProductAddEditDialogComponent, ProductDeleteDialogComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
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
export class ProductModule { }

// required for AOT compilation
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
