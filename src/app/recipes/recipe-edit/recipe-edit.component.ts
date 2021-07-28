import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number /* number | undefined */; //this way no need of initialising it or '!'
  editMode: boolean = false;
  recipeForm!: FormGroup;


  constructor(private currRoute: ActivatedRoute, private recSer: RecipeService , private router: Router) { }

  ngOnInit(): void {
    this.currRoute.params.subscribe((params: Params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] != null; //if there is an id parameter in the url, then we are in the edit mode. Else in the new component mode
      // console.log(this.editMode);
      this.initForm();
    })
  }

  private initForm(){
    let recipeName = '';
    let imgpath='';
    let descr = '';
    let recipeIngs = new FormArray([]);

    if(this.recSer.numRecipes()===0){//not to avoid entering the url before fetching the data but to avoid that situation where the fetched data has 0 recipes. Then this url: http://localhost:4200/recipes/2/edit should not give errors
      this.editMode = false;
    }

    if(this.editMode){
      const rec = this.recSer.getRecipeById(this.id);
      recipeName = rec.name;
      imgpath = rec.imagePath;
      descr = rec.description;
      if(rec.ingredients){
        for(let ing of rec.ingredients){
          recipeIngs.push(
            new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amount: new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      recName: new FormControl(recipeName, Validators.required),
      imgPath: new FormControl(imgpath, Validators.required),
      descr: new FormControl(descr, Validators.required),
      ingredients: recipeIngs,
    })
  }

  getIngredientCtrls(){
    // console.log((this.recipeForm.get('ingredients') as FormArray).controls);
    return (this.recipeForm.get('ingredients') as FormArray);
  }

  onSubmit(){
    // console.log(this.recipeForm);
    // console.log(this.recipeForm.value);//had we named the formControls to match exactly with the property names of a recipe object, we could have directly passed this.recipe.value
    const rec = new Recipe(this.recipeForm.value.recName, this.recipeForm.value.descr, this.recipeForm.value.imgPath, this.recipeForm.value.ingredients);//a FormGroup's finally turns into an object, A formArray into an array and finally formControl is an array element or a property depending on whether they are dierctly under a formgroup or formarray
    if(this.editMode){
      this.recSer.updateRecipe(this.id, rec);
    }
    else{
      this.recSer.addRecipe(rec);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    )
  }
  
  onDelIng(id: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.currRoute});
  }

}
