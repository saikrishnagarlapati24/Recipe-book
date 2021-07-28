import { NgModule } from "@angular/core";
// import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule/* , Routes */ } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { SharedModule } from "../shared/shared.module";

// const routes: Routes = [
//   { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard] },
// ]

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],

  imports: [
    // CommonModule,
    SharedModule,//because this contains commonModule(just for this, though not worth importing this whole module for this single one, but for demo)
    FormsModule,
    RouterModule.forChild([
      // { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard] },
      { path: '', component: ShoppingListComponent, canActivate: [AuthGuard] },//lazy loading
    ]),
  ]
})
export class ShoppingListModule{ }
