import { Component, ElementRef, OnDestroy, OnInit, ViewChild, /* Output, EventEmitter */ } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') name!: ElementRef;
  // @ViewChild('amountInput') amount!: ElementRef;
  // @Output() ingAdded = new EventEmitter<Ingredient>();  //https://www.sneppets.com/angular/eventemitter-error-expected-0-type-arguments-but-got-1-angular/

  @ViewChild('f') slForm!: NgForm;
  subscr!: Subscription;
  editMode = false;
  editedItemId!: number;
  editedItem!: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscr= this.shoppingListService.startedEditing.subscribe((id: number)=>{
      this.editMode = true;
      this.editedItemId =id;
      this.editedItem = this.shoppingListService.getIngredientbyId(id);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      })
    })
  }

  // onSubmit(){
  //   const ingname = this.name.nativeElement.value;
  //   const ingamount= this.amount.nativeElement.value
  //   const newIng = new Ingredient(ingname, ingamount);

  //   // this.ingAdded.emit(newIng);
  //   this.shoppingListService.addIngredient(newIng);
  // }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIng = new Ingredient(value.name, value.amount);

    // this.ingAdded.emit(newIng);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemId, newIng);
      this.editMode = false;
    } 
    else{
      this.shoppingListService.addIngredient(newIng);
    }
    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredientById(this.editedItemId);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscr.unsubscribe();
  }
}
