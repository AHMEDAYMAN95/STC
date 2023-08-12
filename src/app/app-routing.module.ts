import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, },
  {
    path: 'stc-product', loadChildren: () => import('./components/product/product.module')
      .then(m => m.ProductModule)
  },
  {
    path: 'stc-categories', loadChildren: () => import('./components/categories/categories.module')
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
