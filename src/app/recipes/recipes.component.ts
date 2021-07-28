import { Component, OnInit } from '@angular/core';
// import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService], //By doing it here we the new recipes added to the recipe list are being lost everytime we go to shopping list and come back to recipe section(a new service instance is being created) because the provider was not injected into header if we provided it here. So, it is changed to appmodule.
})
export class RecipesComponent implements OnInit{
  // selectedRecipe!: Recipe;

  constructor(/* private recipeService: RecipeService  */){}

  ngOnInit(){
    // this.recipeService.recipeSelected.subscribe(//subscribing is what services taught us.
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe;
    //   }
    // );
  }
}
