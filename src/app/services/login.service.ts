import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = "http://localhost:8080";

  public loginStatusSubject = new Subject<boolean>();
  
  constructor(private http:HttpClient) {
  }

  

  //Generate token

  public generateToken(loginData:any){

    return this.http.post<any>(this.baseUrl + "/generate-token",loginData);
  }

  //Get current user : who is logged in

  public getCurrentUser(){
    return this.http.get(this.baseUrl + "/current-user");
  }

  //Login:user - Set generated token in local storage

  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  //islogin: Is user logged in or not

  public isLoggedIn(){

    let tokenStr = localStorage.getItem('token');
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null){

      return false;
    }else{

      return true;
    }
  }

  //logout : remove token from local storage

  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  // get token

  public getToken(){

    return localStorage.getItem("token");
  }

  //store user details here temporarily

  public setUser(user:any){

    localStorage.setItem('user', JSON.stringify(user));

  }

  //get user details

  public getUser(){

    let userStr = localStorage.getItem("user");
    if(userStr != null){

      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //get user role

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;  //considering user has only one role
  }



}
