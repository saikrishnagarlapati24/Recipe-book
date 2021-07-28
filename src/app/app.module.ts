import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule/* , HTTP_INTERCEPTORS  */} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component'; //we dont add .ts 
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component'; 
// import { DropdownDirective } from './shared/dropdown.directive';
// import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
// import { RecipeService } from './recipes/recipe.service';
// import { AuthComponent } from './auth/auth.component';
// import { LoadingSpinnerComponent } from './shared/loading spinner/loading-spinner.component';
// import { AuthInterceptorService } from './auth/auth-interceptor.service';
// import { AlertComponent } from './shared/alert/alert.component';
// import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
// import { RecipesModule } from './recipes/recipes.module';//for lazy loading
// import { ShoppingListModule } from './shopping-list/shopping-list.module';//for lazy loading
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
// import { AuthModule } from './auth/auth.module';//for lazy loading

@NgModule({
  declarations: [ //all the components, directives, custom pipes
    AppComponent,
    HeaderComponent,
    // RecipesComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // RecipeStartComponent,
    // RecipeEditComponent,
    // ShoppingListComponent,
    // ShoppingEditComponent,
    // DropdownDirective,//very important thing told about declarations in 9th video in 22nd section(We can declare a component or pipe or directives once)
    // AuthComponent,
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceholderDirective
  ],
  imports: [//other modules
    BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,//this module provides only services but no directives and services are available application wide but not confined to a module unlike other modules here. This is some exception to services providing module(5th vid in 22nd sec and 11th video)
    AppRoutingModule,//this is custom built
    // RecipesModule,//all the exports done inside a module are exposed to the module into which that module is imported but also see the point about declarations near loading spinne component in sharedmodule//this import is commented out after lazy loading
    // ShoppingListModule, //this is for some reason, not working..(Now it is, it was not because of the ** path in the app routing module)// So, the order of paths is effected by the order in which I list the modules here where paths are checked. So, we should see that wild card entries are the last ones to be checked
    SharedModule, //this module has all those like drop down, alert etc as they are cancelled out here
    CoreModule,
    // AuthModule,//for lazy loading
  ],
  providers: [/* ShoppingListService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true } */],//it is not always the case that we can only use a service when we provide it.(3rd video in 22nd section)//Interceptors must be provided like this, in the providers array only but can't be done by providedIn: 'root'
  bootstrap: [AppComponent]
})
export class AppModule { }
