import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProductComponent } from './component/product/product.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { HomeComponent } from './component/home/home.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'stc-product', component: ProductComponent, canActivate: [AdminGuard] },
  { path: 'stc-categories', component: CategoriesComponent },
  { path: 'stc-home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
