import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarComponent } from './shared/star.component';
import { ErrorPageComponent } from './error-page.component';

const routes: Routes = [
  { path: 'star', component: StarComponent },
  {path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
