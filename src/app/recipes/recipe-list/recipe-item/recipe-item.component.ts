import { Component, Input, OnInit/* , Output, EventEmitter */ } from '@angular/core';
// import * as EventEmitter from 'events';
import { Recipe } from '../../recipe.model';
// import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // @Input('r') rec!:{name:string, description:string, imagePath:string}; //this also works
  @Input('r') rec!: Recipe;
  // @Output() recipeSelected = new EventEmitter<{name: string, description: string, imagePath: string}>();//this is not necessary as we dp it like that in recipe-list component. //And also we could have simply written <Recipe> as the type.
  // @Output() recipeSelected = new EventEmitter<void>();

  @Input() index!: number;

  constructor(/* private recipeService: RecipeService */) { }

  ngOnInit(): void {
  }

  // OnSelected(){
  //   // this.recipeSelected.emit({name: this.rec.name, description: this.rec.description, imagePath: this.rec.imagePath});

  //   this.recipeService.recipeSelected.emit(this.rec);
  // }

}
