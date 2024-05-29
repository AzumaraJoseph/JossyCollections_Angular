import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarComponent } from './shared/star.component';
import { ErrorPageComponent } from './error-page.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { DialogueComponent } from './product/dialogue.component';
import { OrderComponent } from './order.component';
import { CartShellComponent } from './cart/cart-shell/cart-shell.component';

const routes: Routes = [

  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products/:id/dialogue', component: DialogueComponent },
  { path: 'order', component: OrderComponent },
  { path: 'star', component: StarComponent },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'cart', component: CartShellComponent },
  {path: '**', component: ErrorPageComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
