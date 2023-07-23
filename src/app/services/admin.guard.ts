import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const adminGuard: 
CanActivateFn = (route, state) => {

  const login = inject(LoginService);
  const router = inject(Router);

  if(login.isLoggedIn() && login.getUserRole()=='ADMIN'){ //To conditions to be met for /admin url to be accessed i.e role must be of admin and admin must be logged in
                                                          
    return true;
  }
  router.navigate(['login']);
  return false;
};


