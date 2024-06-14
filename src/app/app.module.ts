import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { SharedModule } from './shared/shared.module';
import { DialogueComponent } from './dialogue.component';
import { OrderComponent } from './order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './shared/toast.component';
import { UserModule } from './user/user.module';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { CartShellComponent } from './cart/cart-shell/cart-shell.component';
import { CartTotalComponent } from './cart/cart-total/cart-total.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { OrderShellComponent } from './order/order-shell.component';
import { CreateOrderTotalComponent } from './order/create-order-total/create-order-total.component';
import { OrderHistoryComponent } from './order/order-history/order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ErrorPageComponent,
    ProductDetailComponent,
    DialogueComponent,
    OrderComponent,
    ToastComponent,
    CartListComponent,
    CartItemComponent,
    CartShellComponent,
    CartTotalComponent,
    CreateOrderComponent,
    CreateOrderTotalComponent,
    OrderShellComponent,
    OrderHistoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    // ProductModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




