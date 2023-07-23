import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  quiz_id=0;

  public quiz={

    title:'',
    description:'',
    maxMarks:'',
    num_Of_Questions:'',
    active:'true',
    category:{
      cid:'',
    }
  }

  category=[

    {

      cid:'',
      title:'',
      description:'',

    }
  ]
  constructor(private route:ActivatedRoute,private _quiz:QuizServiceService,private categories:CategoryService,private snack:MatSnackBar,private router:Router){}
  ngOnInit(): void {

    //Getting quiz_id from url
    this.quiz_id = this.route.snapshot.params['quiz_id'];
    console.log(this.quiz_id);

    //Get Categories

    this.categories.getCategories().subscribe(

      (data:any)=>{

        this.category=data;
        console.log(data);

      },

      (error)=>{

        console.log('Error !!');
        console.log(error);
      }
    )
    
    

    //Get quiz object by quiz_id

    this._quiz.getQuizById(this.quiz_id).subscribe(

      (data:any)=>{

        this.quiz = data;
        console.log(data);
      },
      (error)=>{

        console.log('Error !!');
        console.log(error);
      }
    )
  }

  //Update quiz

  public formSubmit(){

    if(this.quiz.title.trim()=='' || this.quiz.title==null){
      this.snack.open('Title is required','ok',{
        duration:3000,
      });
      return;
    }else if(this.quiz.maxMarks =='' || this.quiz.maxMarks==null){
      this.snack.open('Provide maximum number of marks for quiz.','ok',{
        duration:3000,
      });
      return;
    }else if(this.quiz.num_Of_Questions=='' || this.quiz.num_Of_Questions==null){
      this.snack.open('Provide maximum number of questions for quiz.','ok',{
        duration:3000,
      });
      return;
    }
    else if(this.quiz.category.cid=='' || this.quiz.category.cid==null){
      this.snack.open('Give category to quiz.','ok',{
        duration:3000,
      });
      return;
    }


    this._quiz.updateQuiz(this.quiz).subscribe(

      (data:any)=>{

        console.log('Success !!');
        console.log(data);

        Swal.fire('Success !!','Quiz updated successfully.','success').then((e)=>{

          this.router.navigate(["/admin/view-quizzes"]);

        });


      },
      (error)=>{

        console.log('Error !!');
        console.log(error);

        Swal.fire('Error','Error in updating data','error');
      }
    )
  }



}
