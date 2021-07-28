import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";
// import { AlertComponent } from "../shared/alert/alert.component";//in showErrorAlert method


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy{
  inLoginMode = true;
  isLoading = false;
  error: string = '';
  @ViewChild(PlaceholderDirective, {static: false}) alertHost!: PlaceholderDirective;//this gives access to the first elment which has this directive
  private closeSub!: Subscription;

  constructor(private authServ: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}

  onSwitchMode(){
    this.inLoginMode = !this.inLoginMode;
  }

  onSubmit(form: NgForm){
    // console.log(form.value);
    if(!form.valid){//if a user hacks his way by enabling the submit button though
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.error = '';
    this.isLoading = true;

    if(this.inLoginMode){
      authObs = this.authServ.login(email, password)/* .subscribe(response =>{
        console.log(response);
        this.isLoading = false;
      }, errRes=>{
        console.log(errRes);
        this.error = errRes;
        this.isLoading = false;
      }); */
    }
    else{
      authObs = this.authServ.signup(email, password)/* .subscribe(response =>{
        console.log(response);
        this.isLoading = false;
      }, errRes=>{
        console.log(errRes);
        // switch(errRes.error.error.message){
        //   case 'EMAIL_EXISTS': {this.error = 'The email address is already in use by another account!'; break;}
        //   case 'OPERATION_NOT_ALLOWED': {this.error = 'Password sign-in is disabled for this project!';  break;}
        //   case 'TOO_MANY_ATTEMPTS_TRY_LATER': {this.error = 'We have blocked all requests from this device due to unusual activity. Try again later!';  break;}
        //   default: this.error = 'An error occured!'
        // }
        this.error = errRes;
        this.isLoading = false;
      }); */
      // this.isLoading = false;
    }

    authObs.subscribe(response =>{
      // console.log(response);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errRes=>{
      console.log(errRes);
      this.error = errRes;
      this.showErrorAlert(errRes);
      this.isLoading = false;
    });
    form.reset();
  }

  onHandleError(){
    this.error = '';
  }

  //dynamic component creation
  private showErrorAlert(errMes: string){
    // const alertComp = new AlertComponent(); //this is not the way. It does not do what it should do. Here we are just creating an object. Angular does more than that, displays the component on the DOM etc..this is not what creation means. We have to let angular what it does to display components
    
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);//we just have to pass the component name. Angular knows where to look for it.
    const hostViewContainerRef = this.alertHost.viewContRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = errMes;
    this.closeSub = componentRef.instance.close.subscribe(//this is some exception where we subscribe to an eventemittor. Watch video
      ()=>{
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}