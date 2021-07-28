import { Component, OnDestroy, OnInit,/*  EventEmitter, Output */ } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import * as EventEmitter from 'events';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  // recipes: Recipe[] = [ //an array of 'Recipe' type objects; not just a single Recipe object
  //   new Recipe('pizza', 'This is a test', 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW5ncmVkaWVudHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'),
  //   new Recipe('pizza', 'This is another test', 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW5ncmVkaWVudHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'),
  // ];

  recipes: Recipe[] = [];
  subscr!: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private currRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscr = this.recipeService.recipesChanged.subscribe((recipees: Recipe[])=>{
      // console.log(recipees);
      this.recipes = recipees;
    })
    // this.recipeService.getRecipes();

    this.recipes = this.recipeService.getRecipes();//changed back to this again because infeasibility with the http section. Initially in previous section I used subjects even to get the initial recipes. Here I cancelled out emitting a subject in the getRecipes method and got them by normal returning. Subscription to the subject here is necesary because when added a new recipe or edited a recipe
  }

  // OnRecipeSelected(re: Recipe){
  //   this.recipeWasSelected.emit(re);
  // }

  OnNew(){
    this.router.navigate(['new'], {relativeTo: this.currRoute});//navigate method does not know about the curre route on its own
  }

  ngOnDestroy(){
    this.subscr.unsubscribe();
  }
}
