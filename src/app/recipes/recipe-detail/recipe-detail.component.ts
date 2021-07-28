import { Component,/*  Input, */ OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() reci!: Recipe;
  reci!: Recipe;
  id!: number;

  constructor(private recipeService: RecipeService, private currRoute: ActivatedRoute, private router: Router) { }//not only services we can also inject these things. No need of provider. 

  ngOnInit(): void {
    // const id = this.currRoute.snapshot.params['id']; //works only first time when loaded
    // this.reci = this.recipeService.getRecipeById(+id -1);

    //for change in params if already on the same url
    this.currRoute.params.subscribe((params: Params) => {
      this.id = +params.id; //or this.id = params['id'];
      if(this.recipeService.numRecipes()>this.id){
        this.reci = this.recipeService.getRecipeById(this.id);
      }
    })
  }

  onAddToShLi(){
    this.recipeService.addIngsToShList(this.reci.ingredients);
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo:this.currRoute }); //equivalently
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo:this.currRoute });
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
