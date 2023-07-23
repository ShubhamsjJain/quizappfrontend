import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:'',
  };

  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router){

  }

  ngOnInit(): void {
    
  }


  //Submitting form

  formSubmit(){

    console.log("Login button clicked");

    if(this.loginData.username.trim()=='' || this.loginData.username==null){
      this.snack.open('Username is required !!', 'ok',{
        duration: 3000,
      });

      return;
    }
    

    else if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open('Password is required !!', 'ok',{
        duration: 3000,
      });

      return;
    }

    //Request server to generate token and Login if token is received

    this.login.generateToken(this.loginData).subscribe(

      {
      next: (data)=>{
        console.log('success');
        console.log(data);

        //Login...Since token is generated ,hence save token in localStorage using the methods created 
        //in loginService

        this.login.loginUser(data.token); // sending token received to service 

        //Now also store user details to local storage using service methods we have created
      
        this.login.getCurrentUser().subscribe(
          (user: any)=>{
            this.login.setUser(user);
            console.log(user);

            //redirect...ADMIN: Admin-dashboard
            //redirect...USER: User-dashboard

            if(this.login.getUserRole()=='ADMIN'){

              //admin dashboard
              //"window.location.href='/admin'
              this.router.navigate(['/admin']);
              this.login.loginStatusSubject.next(true);

            }else if(this.login.getUserRole()=='USER'){
              //User dashboard
              //window.location.href='/user-dashboard';
              this.router.navigate(['/user-dashboard']);
              this.login.loginStatusSubject.next(true);
              
            }else{
              //logout
              this.login.logout();
            }
          }
        )
      },
      error:(error)=>{
        console.log('Error !!');
        console.log(error);
        this.snack.open('Invalid Credentials !! Try Again','ok',{
          duration: 3000,  //in milliseconds
        })
      }
    }
    );
  
  }

  
}
