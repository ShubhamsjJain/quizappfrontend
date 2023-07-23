import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const userGuard: 
CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  const router = inject(Router);

  if(login.isLoggedIn() && login.getUserRole()=='USER'){ //To conditions to be met for /user-dashboard url to be accessed i.e role must be of user and user must be logged in
                                                          
    return true;
  }
  router.navigate(['login']);
  return false;
};
