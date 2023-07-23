import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[

    {

      quiz_id:'',
      title:'',
      description:'',
      maxMarks:'',
      num_Of_Questions:'',
      category:{
        title:'',
      }
    }
    
   
  ];

  constructor(private quiz:QuizServiceService,private snack:MatSnackBar){}
  ngOnInit(): void {
    
    this.quiz.getQuizzes().subscribe(

      (data:any)=>{

        this.quizzes=data;
        console.log("success");
        console.log(data);

      },
      (error)=>{

        console.log("Error !!");
        console.log(error);
        Swal.fire('Error !!','Something went wrong.','error');
      }

    )

    
  }

  deleteQuiz(quiz_id:any){


    Swal.fire({

      icon: 'info',
      title: 'Are you sure you want to delete this quiz?',
      confirmButtonText: 'Delete',
      showCancelButton: true,

    }).then((result)=>{

      if(result.isConfirmed){

        //delete the quiz

        this.quiz.deletingQuiz(quiz_id).subscribe(

          (data:any)=>{
    
            //Quiz is deleted from backend bu still visible on frontend until refresh,
            //hence to remove it from fronted just after deletion
    
            this.quizzes = this.quizzes.filter((quizzes)=> quizzes.quiz_id != quiz_id);//i.e to show only those quizzes whose quiz_id is not equal to deleted quiz_id
    
            Swal.fire('Success !!','Quiz deleted successfully.', 'success');
          },
          (error)=>{
    
            Swal.fire('Error !!','Error in deleting quiz.',error);
          }
        )
        
      }
    })
    
  }

  

}
