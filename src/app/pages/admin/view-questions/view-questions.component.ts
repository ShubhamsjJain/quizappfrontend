import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  quiz_id:any;
  title:any;
  questions_quiz:any=[];
  qid:any;

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

  public deleteQuestion(qid:any){

    Swal.fire({

      icon: 'info',
      title: 'Are you sure you want to delete this Question?',
      confirmButtonText: 'Delete',
      showCancelButton: true,

    }).then((result)=>{

      if(result.isConfirmed){

        //Delete the question

        this.Questions.deleteQuestion(qid).subscribe(

          (data:any)=>{
    
           //Question is deleted from backend but still visible on frontend until refresh,
           //hence to remove it from fronted just after deletion
    
            this.questions_quiz = this.questions_quiz.filter((questions_quiz: { qid: any; })=> questions_quiz.qid != qid);//i.e to show only those questions whose qid is not equal to deleted qid
    
            Swal.fire('Success !!','Question deleted successfully.', 'success');
          },
          (error)=>{
    
            console.log('Error !!');
            console.log(error);
    
            Swal.fire('Error !!','Error in deleting question','error');
          }
        )
      }

    })

    
  }

}
