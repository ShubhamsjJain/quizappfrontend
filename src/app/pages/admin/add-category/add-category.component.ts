import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  public category={
    title:'',
    description:'',
  }

  constructor(private categories:CategoryService,private snack:MatSnackBar){}

  ngOnInit(): void {
    
  }

  //Submitting form

  formSubmit(){

    if(this.category.title.trim()=='' || this.category.title==null){
      this.snack.open('Title is required !!', 'ok',{
        duration:3000,
      });
      return;
    }
    else if(this.category.description.trim()=='' || this.category.description==null){

      this.snack.open('Description is required','ok',{
        duration:3000,
      });
      return;
    }

    //Send data to server

    this.categories.addCategory(this.category).subscribe(

      (data:any)=>{

        console.log('success');
        console.log(data);

        Swal.fire('Success !!','Category successfully created','success');

        //Clear the printed data from fields after submission
        this.category.title='';
        this.category.description='';
      },
      (error)=>{
        console.log('Error !!');
        console.log(error);

        this.snack.open('Something went wrong','ok',{
          duration:3000,
        });
      }

    )

  }

}
