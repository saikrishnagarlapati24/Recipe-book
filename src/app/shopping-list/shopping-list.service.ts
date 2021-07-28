// import {EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';
import {Ingredient} from '../shared/ingredients.model';

export class ShoppingListService{
  // ingAdded = new EventEmitter<Ingredient[]>();
  ingAdded = new Subject<Ingredient[]>(); //this should have been named as ingChanged
  startedEditing = new Subject<number>();

  private ingredients:Ingredient[] = [
    new Ingredient('Chilli', 15),
    new Ingredient('Tomato', 10),
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ing: Ingredient){
    this.ingredients.push(ing);
    this.ingAdded.next(this.ingredients.slice());
  }

  addIngredients(ings: Ingredient[]){
    this.ingredients.push(...ings);
    this.ingAdded.next(this.ingredients.slice());
  }

  getIngredientbyId(id: number){
    return this.ingredients[id];
  }  

  updateIngredient(id: number, newIng: Ingredient){
    this.ingredients[id] = newIng;
    this.ingAdded.next(this.ingredients.slice());
  }

  deleteIngredientById(id: number){
    this.ingredients.splice(id,1);
    this.ingAdded.next(this.ingredients.slice());
  }
}