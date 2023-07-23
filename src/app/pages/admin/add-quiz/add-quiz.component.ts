import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

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

  constructor(private quizzes: QuizServiceService,private snack:MatSnackBar,private categories:CategoryService){}

  ngOnInit(): void {
    
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
  }

  formSubmit(){

    if(this.quiz.title.trim()=='' || this.quiz.title==null){
      this.snack.open('Title is required','ok',{
        duration:3000,
      });
      return;
    }else if(this.quiz.maxMarks.trim()=='' || this.quiz.maxMarks==null){
      this.snack.open('Provide maximum number of marks for quiz.','ok',{
        duration:3000,
      });
      return;
    }else if(this.quiz.num_Of_Questions.trim()=='' || this.quiz.num_Of_Questions==null){
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

    //Add quiz
    this.quizzes.addQuiz(this.quiz).subscribe(

      (data:any)=>{

        console.log('success');
        console.log(data);
  
        Swal.fire('Success !!','Quiz created successfully.','success');

         //Clear the printed data from fields after submission
        this.quiz.title='',
        this.quiz.description='',
        this.quiz.maxMarks='',
        this.quiz.num_Of_Questions='',
        this.quiz.category.cid='';
      },
      (error)=>{

        console.log('Error !!');
        console.log(error);
        Swal.fire('Error !!','Internal server error',error);
      }

    )
  }

  





}
