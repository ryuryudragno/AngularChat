import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({//サービスと変わらん
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private afAuth:AngularFireAuth,
    private router:Router,
  ){}

  canActivate(//ページ遷移をチェックするメソッド
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.afAuth.authState.pipe(
      map((user: firebase.User | null) =>{
        if(!user){
          return true;
        }else{
          // this.router.navigateByUrl('/');
          // return false;
          return this.router.parseUrl('/');//UrlTree,上2行を一行で書ける
        }
      })
    );
  }

}
