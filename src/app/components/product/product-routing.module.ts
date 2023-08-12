import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';
import { permissionGuard } from 'src/app/guards/permission.guard';
import { ProductComponent } from './products/products.component';

const routes: Routes = [
  {
    path: 'product', component: ProductComponent,
    canActivate: [authGuard, permissionGuard],
    data: { permissions: 'admin' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
