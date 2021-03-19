import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ac-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin:boolean;

  constructor(
    private afAuth:AngularFireAuth,
    private router:Router,
    private authServibe:AuthService,

  ) { }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user: any) =>　{//ログイン状態が切り替わるたびに実行,なぜかfirebase.User型が使えない
      this.isLogin = !!user;//ログインしてる状態しか渡らないので未ログイン時は勝手にfalseになる
    });
  }

  logout():void{
    this.authServibe.logout()
      .then(() => this.router.navigateByUrl('/login'));
  }

}
