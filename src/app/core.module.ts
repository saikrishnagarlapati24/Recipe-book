import { NgModule } from "@angular/core";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RecipeService } from "./recipes/recipe.service";

import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";

@NgModule({//this module is a replacement for only those services which are provided in the providers array o the app module. No need for those servives which are providedIn: 'root'
  providers: [
    ShoppingListService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  //we don't need to export here the services. They are simply injected in the root level. We just have to import this module app module
})
export class CoreModule{}