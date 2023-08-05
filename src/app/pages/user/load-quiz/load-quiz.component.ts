import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  quiz_data:any;
  cat_Id:any;
  constructor(private _route:ActivatedRoute, private quiz:QuizServiceService){}
  ngOnInit(): void {
    
    this._route.params.subscribe((params)=>{

      this.cat_Id = this._route.snapshot.params['cat_id'];
      console.log(this.cat_Id);

      if(this.cat_Id == 0){
        console.log("Load all the quiz");
  
        this.quiz.getActiveQuizzes().subscribe(
          (data:any)=>{
  
            console.log("Success !!");
            console.log(data);
            this.quiz_data = data;
          },
          (error)=>{
  
            console.log("Error !!");
            console.log(error);
            Swal.fire('Error !!','Error in loading data','error');
          }
        )
      }else{
        console.log("Load all quiz of given category id");
  
        this.quiz_data = [];
        this.quiz.getAllActiveQuizzesByCategoryId(this.cat_Id).subscribe(
  
          (data:any)=>{
  
            console.log("Success !!");
            console.log(data);
            this.quiz_data = data;
  
          },
          (error)=>{
  
            console.log("Error !!");
            console.log(error);
            Swal.fire('Error !!','Error in loading quizzes','error');
          }
        )
      }

    })
    

    
  }

}
