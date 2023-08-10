import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { UserService } from '../services/user.service';


export function loggedUserGuard(): CanActivateFn  {

  return (): boolean => {

    const userService: UserService = inject(UserService);
    const router: Router = inject(Router);

    if(userService.isLoggedIn) {
      router.navigate(['catalog']);

      return false;
    } 

    return true;
  }
};
