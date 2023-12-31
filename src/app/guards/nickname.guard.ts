import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { inject } from '@angular/core';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { SwalUtils } from '../utils/swal-utils';
import IUser from '../models/IUser';

export const nicknameGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const loginService = inject(LoginService)
  var currentUser: IUser | null = null
  loginService.getCurrentUser().subscribe(res =>{
    currentUser = res
  })
  return loginService.userDataReady.pipe(
    take(1),
    catchError(() => {
      router.navigate(['/home']);
      SwalUtils.customMessageError('Authentication error', 'This is not your profile')
      return of(false);
    }),
    switchMap(() => 
      loginService.userState().pipe(
        map(user => {
          if (user && route.params['nickname'] === currentUser?.nickname) {
            return true;
          } else {
            router.navigate(['/home']);
            SwalUtils.customMessageError('Authentication error', 'This is not your profile')
            return false;
          }
        })
      )
    )
  );
};
