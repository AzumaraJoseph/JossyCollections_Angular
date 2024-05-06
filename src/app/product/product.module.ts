import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ProductListComponent },
]

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    // CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
