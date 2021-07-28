
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
// import { AuthGuard } from "./auth/auth-guard";
// import { AuthComponent } from "./auth/auth.component";
// import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
// import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
// import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
// import { RecipesResolverService } from "./recipes/recipes-reolver.service";
// import { RecipesComponent } from "./recipes/recipes.component";
// import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
  { path: '',  redirectTo: 'recipes', pathMatch :'full'},//pathmatch is important for redirecting
  // { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard],/* pathMatch: 'prefix', */ children:[
  //   {path: '', component: RecipeStartComponent},
  //   {path: 'new', component: RecipeEditComponent},//resolvers and guards are important
  //   {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]}, //order of listing these paths is important. This one above the 'new' path will lead to id parameter catching the id value as 'new' which results in error. Also cautions if the recipes are 0 are taken in these two components
  //   {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}, //we can have two paths for the same component. We have to know in the component in which path we are.
  // ]},
  // { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard] },
  // { path: 'auth', component: AuthComponent },
  // { path: '**', redirectTo: 'recipes'}//this is the thing that made shopping list module not work. Why? Probably because this is encountered first than the 'shopping-list' path present in the shopping list module. So, after all the paths in this module were checked, the paths in the other modules were checked, I see. So, that was the case with recipes route too but I didn't notice it because that wass the path it was redirected to.

  //lazy loading
  { path: 'recipes', loadChildren: ()=> import('./recipes/recipes.module').then(m=>m.RecipesModule)},
  { path: 'shopping-list', loadChildren: ()=> import('./shopping-list/shopping-list.module').then(m=>m.ShoppingListModule)},
  { path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule)},

]

@NgModule({
  // imports: [RouterModule.forRoot(appRoutes)],//before preloading lazy loading
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }