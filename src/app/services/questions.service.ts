import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private baseUrl = "http://localhost:8080/question";

  constructor(private http:HttpClient) { }

  //Get all Questions by Quiz Id (i.e for admin)

  public getAllQByQuizId(quiz_id:any){

    console.log(quiz_id);
    return this.http.get<any>(this.baseUrl + "/quiz/all/" + quiz_id);

}

}
