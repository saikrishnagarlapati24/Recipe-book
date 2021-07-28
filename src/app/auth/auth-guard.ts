import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map,/* , tap */ take} from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})//this file could have been named as service.ts
export class AuthGuard implements CanActivate{

  constructor(private authServ: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {//read the links in the notes to understand when a router or a guard should be used and differenvces(medium links)
    // return this.authServ.user.pipe(map(user =>{//this is a subject(which is, we can say an observable)//we should not subscribe to it here but return the observable may be angular subscribes it and takes the data
    //   return !!user; //this turns a truish value to true and falsish value to false(told in some 14th or aroundth video  in header component where I didn't use it)
    // }));//here when false automatically redirected to previous route

    //if we want to reroute to some other page(one approach, may fail in some edge cases leading to raise conditions with multiple redirects and conflicts I don't know, not standard approach)
    // return this.authServ.user.pipe(map(user =>{//this is a subject(which is, we can say an observable)//we should not subscribe to it here but return the observable may be angular subscribes it and takes the data
    //   return !!user; //this turns a truish value to true and falsish value to false(told in some 14th or aroundth video  in header component where I didn't use it)
    // }), 
    // tap(isAuth =>{
    //   if(!isAuth){
    //     this.router.navigate(['/auth']);
    //   }
    // })
    // );

    //good approach

    return this.authServ.user.pipe(
      take(1),//this is added so to unsubscribe the otherwise continuous subscripton for every time this gaurd is run and may give but it should not give some unexpected side effects. So, now subscription is created at the execution of this gaurd and unsubscribed immediately and a new ubscription is made when the gaurd is run again
      map(user =>{
      const isAuth = !!user;
      if(isAuth){
        // console.log('Hi');
        return true;
      }
      else{
        return this.router.createUrlTree(['/auth']);
      }
    }));
  }
}