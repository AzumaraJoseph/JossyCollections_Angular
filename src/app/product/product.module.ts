import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  // { path: '', redirectTo: 'products', pathMatch: 'full' },
  // { path: 'products', component: ProductListComponent },
  
]

@NgModule({
  declarations: [
    // ProductListComponent,
    // ProductDetailComponent
  ],
  imports: [
    // CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
