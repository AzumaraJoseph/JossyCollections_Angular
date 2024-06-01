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
import { ToastComponent } from './toast.component';
import { UserModule } from './user/user.module';
import { CartComponent } from './cart/cart.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { CartShellComponent } from './cart/cart-shell/cart-shell.component';
import { CartTotalComponent } from './cart/cart-total/cart-total.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ErrorPageComponent,
    ProductDetailComponent,
    DialogueComponent,
    OrderComponent,
    ToastComponent,
    CartComponent,
    CartListComponent,
    CartItemComponent,
    CartShellComponent,
    CartTotalComponent,
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




