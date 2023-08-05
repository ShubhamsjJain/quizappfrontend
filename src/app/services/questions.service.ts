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

//Get questions as per max no. of questions in quiz(i.e for user)

public getMaxQuestAsPerQuizId(quiz_id:any){

console.log("I am in question service and quiz id is "+ quiz_id);
  return this.http.get<any>(this.baseUrl + "/quiz/" + quiz_id)
}

//Add question

public addQuestions(question:any){

  return this.http.post<any>(this.baseUrl + "/",question);
}

//Delete question

public deleteQuestion(qid:any){

  return this.http.delete<any>(this.baseUrl + "/" + qid);
}

//Evaluate quiz

public evaluateQuiz(quiz_questions:any){

  console.log("In service for eval quiz" + quiz_questions)
  return this.http.post<any>(this.baseUrl + '/eval-quiz',quiz_questions);
}

}
