import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'stc-product', component: ProductComponent, canActivate: [AdminGuard]  },
  { path: 'stc-categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'stc-home', component: HomeComponent },
  { path: 'stc-not-found', component: NotFoundComponent },
  { path: '', redirectTo: '/stc-home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
