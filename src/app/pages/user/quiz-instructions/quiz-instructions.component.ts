import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-instructions',
  templateUrl: './quiz-instructions.component.html',
  styleUrls: ['./quiz-instructions.component.css']
})
export class QuizInstructionsComponent implements OnInit {

  qid:any;
  quiz_data:any;

  constructor(private _route:ActivatedRoute,private quiz:QuizServiceService,private router:Router){}
  ngOnInit(): void {
    
    this.qid = this._route.snapshot.params['quiz_id'];
    console.log(this.qid);

    this.quiz.getQuizById(this.qid).subscribe(

      (data:any)=>{

        console.log("Success !!");
        console.log(data);
        this.quiz_data= data;

      },
      (error)=>{

        console.log("Error !!");
        console.log(error);

        Swal.fire('Error !!','Error in loading page','error');
      }
    )
    

  }

  startQuiz(){

    Swal.fire({
      title: 'Do you want to start the quiz?',
      
      showCancelButton: true,
      confirmButtonText: 'START',
      icon:'question'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this.router.navigate(['/start/' + this.qid])
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    

  }

}
