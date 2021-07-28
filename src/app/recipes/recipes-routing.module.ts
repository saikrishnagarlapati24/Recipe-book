import { NgModule } from "@angular/core";


import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipes-reolver.service";
import { RecipesComponent } from "./recipes.component";


const routes: Routes = [
  // { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard],/* pathMatch: 'prefix', */ children:[//before lazy loading
    { path: '', component: RecipesComponent, canActivate: [AuthGuard],/* pathMatch: 'prefix', */ children:[//after lazy loading
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},//resolvers and guards are important
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]}, //order of listing these paths is important. This one above the 'new' path will lead to id parameter catching the id value as 'new' which results in error. Also cautions if the recipes are 0 are taken in these two components
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}, //we can have two paths for the same component. We have to know in the component in which path we are.
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class RecipesRoutingModule{

}