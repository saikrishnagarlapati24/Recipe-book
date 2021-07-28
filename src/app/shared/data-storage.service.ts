import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { /* exhaustMap, */ map/* , take */, tap } from 'rxjs/operators';
// import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})//because we are injecting the http service into this service
export class DataStorageService{
  constructor(private http: HttpClient, private recServ: RecipeService/* , private authServ: AuthService */){ }//this service does not use even authservice anymore as its part is automatically done by the auth-interceptor

  storeRecipes(){
    const recipes = this.recServ.getRecipes();
    this.http.put('https://angular-recipebook-2b005-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response=>{//the type of reqs (put etc) are dependent on the api that we are using
      // console.log(response);//no cryptic ids in 'put' method. Just returns the data we sent to put
    });
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('https://angular-recipebook-2b005-default-rtdb.firebaseio.com/recipes.json')
    .pipe(
      map(response =>{
        if(!response){
          return [];
        }
        return response.map(recipe => {//here map is an array method//how is spread working on objects
          return {...recipe, ingredients: recipe.ingredients? recipe.ingredients: []};//if the ingredients array is an empty one, then that property is not stored at all in the firebase. So, while retreiveing the data we need to introduce it for those there are no ingredients
        });
      }),
      tap((response)=>{//tap allows executing some code without altering the response that goes through it
        this.recServ.setRecipes(response);
      })
    );


    // this.authServ.user.pipe(take(1)).subscribe(user => {//watch video why take is used//to unsubscribe immediately after getting just one value//so this subscription lasts from the point this method starts execution to it ends(upto it got one value and executed the subscribe's method)
    // })//returning from inside the subscribe does not work(It only returns from that subscribe method may be but not the fetch method). So the below solution

    //we could do the same in the storeRecipes also but we are going to use interceptors
    // 2)
    // return this.authServ.user.pipe(take(1), exhaustMap(user =>{//after getting one-time data from the user observable the exhaustMap operator executes its method and replaces the old observable(user) with the observable returned inside it. So, what is finally returned in the http observable only. Inside the exhaustMap we use the user observable and for the http observable the map and tap operators are applied. So, finally for the outside world it still looks like httpobservable->pipe(map, tap)->subscribe
    //   console.log(user);
    //   return this.http.get<Recipe[]>('https://angular-recipebook-2b005-default-rtdb.firebaseio.com/recipes.json',{//this is moved to here //for firebase api we need to add the token as queryparams to the url or send as an object
    //     params: new HttpParams().set('auth', user.token),
    //   })
    // }),
    // map(response =>{
    //   if(!response){
    //     return [];
    //   }
    //   return response.map(recipe => {//here map is an array method//how is spread working on objects
    //     return {...recipe, ingredients: recipe.ingredients? recipe.ingredients: []};//if the ingredients array is an empty one, then that property is not stored at all in the firebase. So, while retreiveing the data we need to introduce it for those there are no ingredients
    //   });
    // }),
    // tap((response)=>{//tap allows executing some code without altering the response that goes through it
    //   this.recServ.setRecipes(response);
    // }));

    // 1)
    //this is before adding token to the requests
    // return this.http.get<Recipe[]>('https://angular-recipebook-2b005-default-rtdb.firebaseio.com/recipes.json')
    // .pipe(map(response =>{//the methods inside this pipe are moved to inside the user observable's pipe and so they are applied to the http observable as there is exhaustmap operator
    //   if(!response){
    //     return [];
    //   }
    //   return response.map(recipe => {//here map is an array method//how is spread working on objects
    //     return {...recipe, ingredients: recipe.ingredients? recipe.ingredients: []};//if the ingredients array is an empty one, then that property is not stored at all in the firebase. So, while retreiveing the data we need to introduce it for those there are no ingredients
    //   });
    // }), tap((response)=>{//tap allows executing some code without altering the response that goes through it
    //   this.recServ.setRecipes(response);
    // }))
    // // subscribe is removed from after "this.recServ.setRecipes(response);" is moved to tap for the purpose of writing the resolver
    // // .subscribe(response =>{//the <> part is required to make type script know that the response of the get method is precisely the type of an array of Recipe but not a generic one(whih means any type). Without this the below setrecipes method will give error not knowing the type of response 
    // //   // console.log(response);
    // //   // this.recServ.setRecipes(<Recipe[]>response); //we can also do this without above thing
    // //   this.recServ.setRecipes(response);
    // // })
  }
}