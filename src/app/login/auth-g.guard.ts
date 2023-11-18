import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGGuard implements CanActivate {
  constructor(public authService: LoginService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isAuthorized(route);

  }
  private isAuthorized(route: ActivatedRouteSnapshot): boolean {
    const role = localStorage.getItem('role');
    const expectedRoles = route.data.expectedRoles;
    // const roleMatches = role.findIndex(
    //   (role) => expectedRoles.indexOf(role) !== -1
    // );
    const isPrevillaged=expectedRoles.find(x=>x==role);
    return isPrevillaged!=null;
  }

}
