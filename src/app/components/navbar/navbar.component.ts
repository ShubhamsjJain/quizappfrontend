import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserLoggedIn=false;
  user:any=null;
  constructor(public login: LoginService, private router:Router ){

  }
  ngOnInit(): void {
    
    this.isUserLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>{

      this.isUserLoggedIn=this.login.isLoggedIn();
      this.user=this.login.getUser();

    })
  }

  public logout(){
    this.login.logout();
    
    this.login.loginStatusSubject.next(false);
   //window.location.reload();
    this.router.navigate(['/login']);
    
  }

}
