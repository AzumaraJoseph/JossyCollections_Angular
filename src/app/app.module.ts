import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { SharedModule } from './shared/shared.module';
import { DialogueDirective } from './dialogue.directive';
import { DialogueComponent } from './product/dialogue.component';
import { OrderComponent } from './order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './toast.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ErrorPageComponent,
    ProductDetailComponent,
    DialogueDirective,
    DialogueComponent,
    OrderComponent,
    ToastComponent,
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


