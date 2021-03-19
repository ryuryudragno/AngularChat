import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../../class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth:AngularFireAuth,
    private db:AngularFireDatabase,
  ) { }

  create(email:string,password:string): Promise<void>{
    return this.afAuth.createUserWithEmailAndPassword(email,password)//firebase公式ライブラリ
      .then((credential) => {
        const user : any = credential.user;
        const actionCodeSetting = {
          url: `http://localhost:4200/?newAccount=true&email=${user.email}`
        }
        user.sendEmailVerification(actionCodeSetting);

        this.db.object(`/users/${user.uid}`).set(new User(user));//realtimeDBでデータの保存
      });
  }
  //Promise
  //firebaseのオーセンティケーションと通信を行う
  //通信が終わった後に帰ってくる値をthenメソッドで処理できる

  update(values: {displayName?: string,photoURL?: string}):Promise<void>{
    return this.afAuth.currentUser.then((user: firebase.User | null) =>{//現在ログインしてるユーザーを参照
      if(user){//ログインしてるユーザーがいれば
        user.updateProfile(values)//authを変更
          .then(()=> this.db.object(`/users/${user.uid}`).update(values))//realtimeDBでデータの保存
          .catch(error => console.error(error))

      }

    })
  }

}
