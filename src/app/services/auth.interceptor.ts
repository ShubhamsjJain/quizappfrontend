import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';   
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
  
  
  
  @Injectable()  
  export class AuthInterceptor implements HttpInterceptor {  

    constructor(private login: LoginService) {}  

    intercept(request: HttpRequest<any>, next: HttpHandler): //i.e for any incoming HttpRequest
    Observable<HttpEvent<any>> {  
        

        //add the jwt token present in localstorage to every Api request

        let authReq = request;
        const token = this.login.getToken();
        if(token != null){
            authReq=authReq.clone(   //Setting token in header of request
                { setHeaders: {  
                    Authorization : `Bearer ${token}`  
                },  
              })
        }

    return next.handle(authReq);  //Returning Incoming request after inserting token inside header of request
    }  
  }  

  export const authInterceptorProviders=[
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }
  ]