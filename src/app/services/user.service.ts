import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8080";
  constructor(private http: HttpClient) {

   }

  //add user

  public addUser(user:any){ //though user is an object type but we can use any also

    return this.http.post<any>(this.baseUrl + "/user/",user);
  }
}
