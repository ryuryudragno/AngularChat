import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes:Routes =[
  {path:'',loadChildren:()=> import('./timeline/timeline.module').then(m=>m.TimelineModule)},
  //dynamicImportは関数の実行時にインポートされる、渡ってくるデータのモジュールファイルを参照する
  {path:'users',loadChildren:()=> import('./users/users.module').then(m=>m.UsersModule)},//後から読み込む、遅延読み込み
  //機能モジュールをインポートする方法、早い処理が可能、URLを分けることができる

  {path:'signup',component:SignUpComponent, canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent,canActivate:[AuthGuard]},
  {path:'**',component:NotFoundComponent},//** は指定したもの以外の全てのページ
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)//全体のルート情報を有効に
  ],
  exports: [
    RouterModule//appModuleでrouterを使えるように
  ]
})
export class AppRoutingModule { }
