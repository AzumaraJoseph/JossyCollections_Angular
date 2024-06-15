import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarComponent } from './shared/star.component';
import { ErrorPageComponent } from './error-page.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { DialogueComponent } from './dialogue.component';
// import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CartShellComponent } from './cart/cart-shell/cart-shell.component';
import { OrderShellComponent } from './order/order-shell.component';
import { OrderHistoryComponent } from './order/order-history/order-history.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products/:id/dialogue', component: DialogueComponent },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'cart', component: CartShellComponent, canActivate: [ AuthGuard ] },
  { path: 'order', component: OrderShellComponent, canActivate: [ AuthGuard ] },
  { path: 'order/history', component: OrderHistoryComponent, canActivate: [ AuthGuard ] },
  { path: 'star', component: StarComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
