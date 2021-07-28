import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  // styleUrls: ['./shopping-list.component.css'], //nothing anyway
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients:Ingredient[] = [
  //   new Ingredient('Chilli', 15),
  //   new Ingredient('Tomato', 10),
  // ];

  ingredients: Ingredient[] = [];
  private ingAddedUnsub!: Subscription;

  constructor(private shoppingListSer: ShoppingListService) { }

  ngOnInit(): void {
    // console.log('Hi there');
    this.ingredients = this.shoppingListSer.getIngredients();
    // this.shoppingListSer.ingAdded.subscribe((ingArr: Ingredient[]) => {//when using eventemittor instead of subject
    this.ingAddedUnsub = this.shoppingListSer.ingAdded.subscribe((ingArr: Ingredient[]) => {
      this.ingredients = ingArr;
    })
  }

  onEditItem(id: number){
    this.shoppingListSer.startedEditing.next(id);
  }

  ngOnDestroy(){
    this.ingAddedUnsub.unsubscribe();
  }
}
