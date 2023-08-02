import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export function notLoggedUserGuard(): CanActivateFn  {

  return (): boolean => {

    const userService: UserService = inject(UserService);
    const router: Router = inject(Router);

    if(!userService.isLoggedIn) {
      router.navigate(['users/login']);

      return false;
    } 

    return true;
  }
};
