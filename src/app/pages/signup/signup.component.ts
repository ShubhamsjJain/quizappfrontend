import { Component } from '@angular/core';
import { OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private _snack:MatSnackBar){

  }
  public user={

    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  }

  ngOnInit(): void {}

  
  formSubmit(){
    console.log(this.user);
    if(this.user.username.trim()=='' || this.user.username==null){
      //alert('Usernrme is required!!');
      this._snack.open('Username is required !!', 'ok',{
        duration: 3000,  //in milliseconds
      });
      return;
    }
    else if(this.user.password.trim()=='' || this.user.password==null){
      //alert('Password is required!!');
      this._snack.open('Password is required !!', 'ok',{
        duration: 3000,  //in milliseconds
      });
      return;
    }
    else if(this.user.firstname.trim()=='' || this.user.firstname==null){
      //alert('Password is required!!');
      this._snack.open('Firstname is required !!', 'ok',{
        duration: 3000,  //in milliseconds
      });
      return;
    }
    else if(this.user.lastname.trim()=='' || this.user.lastname==null){
      //alert('Password is required!!');
      this._snack.open('Lastname is required !!', 'ok',{
        duration: 3000,  //in milliseconds
      });
      return;
    }
    else if(this.user.email.trim()=='' || this.user.email==null){
      //alert('Password is required!!');
      this._snack.open('Email-Id is required !!', 'ok',{
        duration: 3000,  //in milliseconds
      });
      return;
    }
    else if(this.user.phone=='' || this.user.phone==null){
      //alert('Password is required!!');
      this._snack.open('Phone number is required !!', 'ok',{
        duration: 3000,  //in milliseconds
      });
      return;
    }

    //adduser : userservice

    this.userService.addUser(this.user).subscribe(
      
      (data) => {
        if(data === "Username already exists"){
          console.log(data);
          this._snack.open(data, 'ok',{
                  duration: 3000,  //in milliseconds
               });
        }else{
          console.log('User created successfully', data);
          Swal.fire('Success !','User '+ data.username +' is registered successfully.','success')
         .then((result)=> {
          if(result.isConfirmed){
            window.location.href='/login';
          }
         });
        }
      },

      (error)=>{
            //error
    
            console.log(error);
    
            //alert("Something went wrong");
            this._snack.open('Username already exists !!', 'ok',{
              duration: 3000,  //in milliseconds
            });
          } 


    )

    //   {
    //     next: (data)=>{
    //     //success
    //     console.log(data);
    //     //alert("success");

    //     /* this._snack.open('Registration successful !!', 'ok',{
    //     //   duration: 3000,  //in milliseconds
    //      });*/

    //      Swal.fire('Success !','User '+ data.username +' is registered successfully.','success')
    //      .then((result)=> {
    //       if(result.isConfirmed){
    //         window.location.href='/login';
    //       }
    //      });
         
    //   },
    //   error: (error)=>{
    //     //error

    //     console.log(error);

    //     //alert("Something went wrong");
    //     this._snack.open('Something went wrong !!', 'ok',{
    //       duration: 3000,  //in milliseconds
    //     });
    //   }
    // }
    
    
     
       
     
      }
}
