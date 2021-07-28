import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject/* , Subject */, throwError } from "rxjs";
import { catchError, tap} from "rxjs/operators";
import { User } from "./user.model";
import { environment } from "src/environments/environment";

export interface AuthResponseData{//watch why he added this in the 8th video
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean,
}

@Injectable({providedIn: 'root'})
export class AuthService{
  // user = new Subject<User>(); //https://dev.to/bhagatparwinder/subjects-behavior-subject-observables-k7p
  user = new BehaviorSubject<User | any>(null);//modified to this from above for adding token to outgoing requests(see the video how this is defferent from the normal subject. Simple though)//so after this, it can be 'null' in the header
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router){}

  autologin(){
    const userData_unparsed = localStorage.getItem('userData');
    if(!userData_unparsed){
      return;
    }
    const userData: {email: string, id: string, _token: string, _tokenExpirationDate: string} = JSON.parse(userData_unparsed);//this is not of type User exactly because it contains all the properties of that object but not its methods(getter)
    const loadededUser =  new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadededUser.token){
      this.user.next(loadededUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
      this.autoLogout(expirationDuration); 
    }
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    }, expirationDuration)
  }

  signup(email: string, password: string){
    // return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKL20vZzhtljnttpk139pJrISjQ-H0mpA`, {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    })//this is an observable, remember
    .pipe(catchError(errRes =>{//this catches the error object that is gooing to be caugth by the subscriber and can return custom data by using throwError that will be caught by the error handler in the subscriber
      return this.handleError(errRes);
      // let errorMessage = 'An error occured!'
      // if(!errRes.error || !errRes.error.error){
      //   return throwError(errorMessage);
      // }
      // switch(errRes.error.error.message){
      //   case 'EMAIL_EXISTS': {errorMessage = 'The email address is already in use by another account!'; break;}
      //   case 'OPERATION_NOT_ALLOWED': {errorMessage = 'Password sign-in is disabled for this project!';  break;}
      //   case 'TOO_MANY_ATTEMPTS_TRY_LATER': {errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later!';  break;}
      //   default: {}
      // }
      // return throwError(errorMessage);

    }), tap(resData =>{//each operator works differently. map works with the data possibly altering  it, catchError plays with the error, tap gets the data but can't alter it but only runs some code using it\
      // const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn)*1000);
      // const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
      // this.user.next(user);
      this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, {//this is an observable and what the user is a subject. To subscribe an observable one should possess(so return to the one who has to subscribe) it (so each observer has own running instance of observable: unicasted). When subject emits, it is throwing what it emits into air for every one of its subscriber catches it.
      email: email,
      password: password,
      returnSecureToken: true,
    })
    .pipe(catchError(this.handleError       //we can do this or like above
      // let errorMessage = 'An error occured!'
      // if(!errRes.error || !errRes.error.error){
      //   return throwError(errorMessage);
      // }
      // switch(errRes.error.error.message){
      //   case 'EMAIL_NOT_FOUND': {errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted!'; break;}
      //   case 'INVALID_PASSWORD': {errorMessage = 'The password is invalid or the user does not have a passwordt!';  break;}
      //   case 'USER_DISABLED': {errorMessage = 'The user account has been disabled by an administrator!';  break;}
      //   default: {}
      // }
      // return throwError(errorMessage);
    ), tap(resData =>{
      this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  private handleAuth(email: string, id: string, token: string, expIn: number){
    const expirationDate = new Date(new Date().getTime() + expIn*1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expIn*1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occured!'
    if(!errRes.error || !errRes.error.error){
      return throwError(errorMessage);
    }
    switch(errRes.error.error.message){
      case 'EMAIL_NOT_FOUND': {errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted!'; break;}
      case 'INVALID_PASSWORD': {errorMessage = 'The password is invalid or the user does not have a passwordt!';  break;}
      case 'USER_DISABLED': {errorMessage = 'The user account has been disabled by an administrator!';  break;}
      case 'EMAIL_EXISTS': {errorMessage = 'The email address is already in use by another account!'; break;}
      case 'OPERATION_NOT_ALLOWED': {errorMessage = 'Password sign-in is disabled for this project!';  break;}
      case 'TOO_MANY_ATTEMPTS_TRY_LATER': {errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later!';  break;}
      default: {}
    }
    return throwError(errorMessage);
  }

  logout(){
    this.user.next(null); //this subject emitted data is only used by save and fetch data methods in data storage service and header also
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){//when we click logout button
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
}