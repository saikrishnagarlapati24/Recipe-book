//a model is data accessed by creation of objects. We instantiate this class. We are using this as type for an array in the recipe-list.component.ts
import { Ingredient } from "../shared/ingredients.model";

export class Recipe{
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(name: string, desc: string, imgpath: string, ings: Ingredient[]){
    this.name = name;
    this.description = desc;
    this.imagePath = imgpath; 
    this.ingredients = ings;
  }
}