import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  quiz_id:any;
  title:any;
  questions_quiz:any=[];

  constructor(private route:ActivatedRoute,private Questions:QuestionsService){}
  ngOnInit(): void {
    
    this.quiz_id = this.route.snapshot.params['quiz_id'];
    this.title= this.route.snapshot.params['title'];

    this.Questions.getAllQByQuizId(this.quiz_id).subscribe(

      (data:any)=>{

        this.questions_quiz = data;
        console.log('success');
        console.log(data);
      },
      (error)=>{

        console.log('Error !!');
        console.log(error);
      }
    )

  }

}
