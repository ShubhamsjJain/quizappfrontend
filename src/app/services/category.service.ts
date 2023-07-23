import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8080/category";

  //Load all the categories

  public getCategories(){

    return this.http.get<any>(this.baseUrl + "/");
  }

  //Get category by Id

  public getCategory(cid:BigInt){

    return this.http.get(this.baseUrl + "/cid")
  }

  //Add Category

  public addCategory(category:any){

    return this.http.post<any>(this.baseUrl +"/",category);
  }

  //Update Category

  public updateCategory(category:any){

    return this.http.put<any>(this.baseUrl + "/", category);
  }

  //Delete category

  public deleteCategory(cid:BigInt){

    return this.http.delete(this.baseUrl + "/cid");

  }
}
