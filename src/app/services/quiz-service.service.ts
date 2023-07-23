import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  private baseUrl = "http://localhost:8080/quiz";
  constructor(private http: HttpClient) { }


  //Get all Quizzes

  public getQuizzes(){

    return this.http.get<any>(this.baseUrl + "/");
  
  }

  //Get quiz by Id

  public getQuizById(quiz_id:any){

    return this.http.get<any>(this.baseUrl + "/" + quiz_id);
  }

  //Add quiz

  public addQuiz(quiz:any){

    return this.http.post<any>(this.baseUrl + "/", quiz);
  }

  //Delete quiz

  public deletingQuiz(quiz_id:any){

    console.log('I am in service and Id is' + quiz_id);

    
    return this.http.delete<any>(this.baseUrl + "/" + quiz_id);
  }

  //Update quiz

  public updateQuiz(quiz:any){

    return this.http.put<any>(this.baseUrl + "/",quiz);

  }
}


