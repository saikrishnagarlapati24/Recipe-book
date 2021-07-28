import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{//resolvers told in routing section//see why <> is addd here//reolvers and guards are important//resolvers are to do something before routing
  constructor(private dataStorageServ: DataStorageService, private recServ: RecipeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){//this is added so as to avoid errors if entered a url with a recipe id before fetching
    // return this.dataStorageServ.fetchRecipes();//see why here subscribe is not necessary//because the angular feature of resolver will automatically subscribe for me

    // const recipes = this.recServ.getRecipes();

    if(this.recServ.numRecipes() === 0)//see video why this if condition is added if you want
    return this.dataStorageServ.fetchRecipes();//see why here subscribe is not necessary //because the angular feature of resolver will automatically subscribe for me
    else //this else condition is for namesake. Don't care it.//the cautions if even after fetching, the number of recipes is 0 are taken in recipe edit and detail components
    return [];//this return is for namesake
  }
}