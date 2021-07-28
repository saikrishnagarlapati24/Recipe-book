import { NgModule } from "@angular/core";
// import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations:[
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,//these are necessary as we use them in recipes-routing module
  ],
  imports: [
    // CommonModule,//as a replacement to browser module as we can import browsermodule in only one module in the whole application(5th vid 22nd Sec)
    SharedModule, //for the same reason in shoppingListModule
    RouterModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
  ],
  exports:[
    // RecipesComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // RecipeStartComponent,
    // RecipeEditComponent, //these are not necessary after this module has its own recipes-routing module. These were exported before when routes in the recipes-routing module were part of app routing module
  ]
})
export class RecipesModule { }
