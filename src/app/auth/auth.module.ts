import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";
// import { LoadingSpinnerComponent } from "../shared/loading spinner/loading-spinner.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    AuthComponent,
    // LoadingSpinnerComponent,//see 11th video 
  ],
  imports:[
    CommonModule,
    FormsModule,
    // RouterModule.forChild([{ path: 'auth', component: AuthComponent }]),
    RouterModule.forChild([{ path: '', component: AuthComponent }]),//lazy loading
    SharedModule
  ]
})
export class AuthModule{}