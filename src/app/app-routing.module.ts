import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { HomeComponent } from './component/home/home.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, },
  {
    path: 'stc-product', loadChildren: () => import('./component/product/product.module')
      .then(m => m.ProductModule), canActivate: [AdminGuard]
  },
  {
    path: 'stc-categories', loadChildren: () => import('./component/categories/categories.module')
      .then(m => m.CategoriesModule)
  },
  { path: 'stc-home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
