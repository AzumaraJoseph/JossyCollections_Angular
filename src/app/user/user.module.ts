import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { CreateAddressComponent } from './address/create-address/create-address.component';


@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    ProfileComponent,
    AddressComponent,
    CreateAddressComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
