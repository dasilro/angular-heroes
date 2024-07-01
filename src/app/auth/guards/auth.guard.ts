import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  UrlSegment,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {
  constructor(private authService: AuthService,
              private router: Router) { }

  private checkAuthStatus(): Observable<boolean> {
    return this.authService.checkAuthentication()
                           .pipe(
                              tap(isAuthenticated => {
                                if (!isAuthenticated) this.router.navigate(['.auth/login']);
                              })
                           );
  }
  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();
  }
}
