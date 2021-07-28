import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authServ: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authServ.user.pipe(take(1), exhaustMap(user =>{//it is as if this observable(which initially is user but finally is http) is being replaced by the http observable in the datastorage service. Just that. From then on, the pipes on that http observable are applied on this http observable after replacing that one. So, we are just doing something on that http observable just before sending request, effectively.
      if(!user){//or we can if check certain urls
        return next.handle(req);//to avoid applying the interceptor to signup and signin
      }
      const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
      return next.handle(modifiedReq);
    }))
  }
}