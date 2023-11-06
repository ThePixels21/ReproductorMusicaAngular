import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { catchError, map, switchMap, take, takeUntil, timeout } from 'rxjs/operators';
import { of } from 'rxjs';
import { SwalUtils } from '../utils/swal-utils';

export const sessionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const loginService = inject(LoginService)
  return loginService.userDataReady.pipe(
    timeout(4500), // wait for 4,5 seconds
    take(1),
    catchError(() => {
      router.navigate(['/login']);
      SwalUtils.customMessageError('Authentication error', 'You do not have access to this page')
      return of(false);
    }),
    switchMap(() => 
      loginService.userState().pipe(
        map(user => {
          if (user) {
            return true;
          } else {
            router.navigate(['/login']);
            SwalUtils.customMessageError('Authentication error', 'You do not have access to this page')
            return false;
          }
        })
      )
    )
  );
}
