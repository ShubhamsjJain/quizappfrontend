import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  quiz_Id:any;
  title:any;

  public addQuestion={

    question:'',
    image:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:{

      quiz_id:'',
    }

  }

  constructor(private route:ActivatedRoute,private que:QuestionsService,private snack:MatSnackBar,private router:Router){}

  ngOnInit(): void {
  
    this.quiz_Id = this.route.snapshot.params['quiz_id'];
    console.log('this is quiz id' + this.quiz_Id);

    this.addQuestion.quiz.quiz_id= this.quiz_Id;

    this.title= this.route.snapshot.params['title'];


  }

  public formSubmit(){

    if(this.addQuestion.question.trim()=='' || this.addQuestion.question==null){
      this.snack.open('Question is required','ok',{
        duration:3000,
      });
      return;
    }else if(this.addQuestion.option1.trim()=='' || this.addQuestion.option1==null){
      this.snack.open('Provide Option 1','ok',{
        duration:3000,
      });
      return;
    }else if(this.addQuestion.option2.trim()=='' || this.addQuestion.option2==null){
      this.snack.open('Provide Option 2','ok',{
        duration:3000,
      });
      return;
    }else if(this.addQuestion.option3.trim()=='' || this.addQuestion.option3==null){
      this.snack.open('Provide Option 3','ok',{
        duration:3000,
      });
      return;
    }else if(this.addQuestion.option4.trim()=='' || this.addQuestion.option4==null){
      this.snack.open('Provide Option 4','ok',{
        duration:3000,
      });
      return;
    }else if(this.addQuestion.answer.trim()=='' || this.addQuestion.answer==null){
      this.snack.open('Answer is required','ok',{
        duration:3000,
      });
      return;
    }
    
    
    this.que.addQuestions(this.addQuestion).subscribe(

      (data:any)=>{

        console.log("Success !!");
        console.log(data);

        Swal.fire('Success !!','Question added successfully.', 'success');

         //Clear the printed data from fields after submission
         this.addQuestion.question='',
         this.addQuestion.option1='',
         this.addQuestion.option2='',
         this.addQuestion.option3='',
         this.addQuestion.option4='',
         this.addQuestion.answer='',
         this.addQuestion.image='';
         

      },
      (error)=>{

        console.log('Error !!');
        console.log(error);

        Swal.fire('Error !!','Error in inserting question.','error');
      }
    )


  }

}
