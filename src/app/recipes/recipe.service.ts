import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Recipe} from './recipe.model';

@Injectable()
export class RecipeService{
  // recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [ //an array of 'Recipe' type objects; not just a single Recipe object //uncommenting the below two lines will start the app with the below items in the recipe list. We chose to rely completely on the items stored in the api. So, now it starts clean and we need to fetch the data
    // new Recipe('Pizza', 'Tasty Pizza', 'https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80', [ new Ingredient('a', 12), new Ingredient('b', 11)/* {name: 'a', amount: 12}, {name: 'b', amount: 13} */]),
    // new Recipe('Burger', 'Tasty Burger', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60', [ new Ingredient('c', 7), new Ingredient('d', 6)/* {name: 'c', amount: 4}, {name: 'd', amount: 5} */]),
  ];

  constructor(private shoppingListServ: ShoppingListService){ }

  getRecipes(){
    return this.recipes.slice(); //for returning a copy of but not the original recipes array
    // this.recipesChanged.next(this.recipes.slice());
  }

  addIngsToShList(ingredients: Ingredient[]){
    // ingredients.forEach(ing => {
    //   this.shoppingListServ.addIngredient(ing);
    // })

    this.shoppingListServ.addIngredients(ingredients);
  }

  getRecipeById(id: number){
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe: Recipe){
    this.recipes[id] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number){
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  numRecipes(){
    return this.recipes.length;
  }
}