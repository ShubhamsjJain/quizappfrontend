import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  qid:any;
  quiz_questions:any=[];

  attempted=0;
  correctAnswers=0;
  wrongAnswers=0;
  marksGot=0;

  isSubmit = false;
  
  timer:any;


  constructor(private _route:ActivatedRoute,private questions:QuestionsService,private locationSt:LocationStrategy){}
  ngOnInit(): void {

    this.preventBackButton();
    
    this.qid = this._route.snapshot.params['quiz_id'];
    console.log(this.qid);
    

    this.questions.getMaxQuestAsPerQuizId(this.qid).subscribe(

      (data:any)=>{

        console.log("Success !!");
        console.log(data);

        this.quiz_questions = data;

        this.timer = this.quiz_questions[0].quiz.num_Of_Questions * 2 * 60;
        // console.log(this.timer);
        this.startTimer();


        // this.quiz_questions.forEach(
        //   (q:any)=>{ 
         
        //     if(q.givenAnswer == q.answer){
        //       this.marksGot = this.marksGot+2;
        //     }
        //     console.log("Marks got: " + this.marksGot)
        // });
      },
      (error)=>{

        console.log("Error !!");
        console.log(error);

        Swal.fire('Error !!','Error in loading questions','error');
      }
    )



  }

  preventBackButton(){

    history.pushState(null, "" ,location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,"",location.href)
    });
  }

  submitQuiz(){

    Swal.fire({
      title: 'Do you want to Submit the quiz?',
      
      showCancelButton: true,
      confirmButtonText: 'SUBMIT',
      icon:'question'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        //Calculation
        
        this.evalQuiz();
        
      } 
    })
  }

startTimer(){

  let t = window.setInterval(()=>{

    if(this.timer <= 0){

      this.evalQuiz();
      clearInterval(t);
    
    }else{
      this.timer--;
    }
  },1000)
}

getFormattedTime(){

  let minute = Math.floor(this.timer/60);
  let seconds = this.timer-minute*60;
  return minute + ' min ' + seconds + ' sec';
}

evalQuiz(){

  //Call to server to evaluate quiz i.e server side evaluation rather than client side evaluation

  this.questions.evaluateQuiz(this.quiz_questions).subscribe(
    (data:any)=>{

      console.log("Success in eval quiz!!");
      console.log(data);
      this.attempted = data.attempted;
      this.correctAnswers =  data.correctAnswers;
      this.wrongAnswers = data.wrongAnswers;
      this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
      this.isSubmit =true;

    },
    (error)=>{

      console.log("Error !!");
      console.log(error);
      Swal.fire('Error !!','Something went wrong','error');
    }
  )

  // this.isSubmit =true;
  // this.quiz_questions.forEach(
  //   (q:any)=>{ 
   
  //     if(q.givenAnswer != null && q.givenAnswer == q.answer){

  //       this.correctAnswers++;
  //       this.wrongAnswers = this.wrongAnswers;
  //       let marksSingle = this.quiz_questions[0].quiz.maxMarks/this.quiz_questions[0].quiz.num_Of_Questions
  //       this.marksGot += marksSingle;
  //       this.attempted += 1;

  //     }
  //     else if(q.givenAnswer != null && q.givenAnswer != q.answer){

  //       this.correctAnswers = this.correctAnswers;
  //       this.wrongAnswers += 1;
  //       let marksSingle = this.quiz_questions[0].quiz.maxMarks/this.quiz_questions[0].quiz.num_Of_Questions
  //       let negativeMarkForEachQuestion = (1/3)* marksSingle;
  //       this.marksGot -= negativeMarkForEachQuestion;
  //       this.attempted += 1;

  //     }else if(q.givenAnswer == null){
  //       this.correctAnswers = this.correctAnswers;
  //       this.wrongAnswers = this.wrongAnswers;
  //       this.marksGot = this.marksGot;
  //       this.attempted = this.attempted;
  //     }
  // });
  // console.log("Attempted questions: " + this.attempted);
  // console.log("Correct Answers: " + this.correctAnswers);
  // console.log("Wrong Answers: "+ this.wrongAnswers)
  // console.log("Marks got: " + this.marksGot);

}

printPage(){

  window.print();
}

}
