import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { Comment } from '../class/comment';
import { User } from '../class/user';
import { map } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'ac-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  comments$:Observable<Comment[]>;
  commentsRef: AngularFireList<Comment>;//de.listのlistがangularfirelist
  currentUser :User;
  currentUser$:Observable<User|null>;
  comment = "";

  constructor(
    private db: AngularFireDatabase,
    private afAuth:AngularFireAuth,
  ){
    //databaseの単一データを/commentsから取得
    this.commentsRef = db.list("/comments");
  }

  ngOnInit(): void {//dbからのデータの取得なのでconstructorではなくここが適正
    this.currentUser$ = this.afAuth.authState.pipe(
      map((user:firebase.User | null) =>{
      if(user){
        this.currentUser = new User(user);
        return this.currentUser;
      }
      return null;
      })
    );
    //valueChangesはリストの実データだけを取得するやつ
    //データキーを含めて取得するのがsnapshotchanges
    this.comments$ = this.commentsRef.snapshotChanges()
      .pipe(
        map((snapshots: SnapshotAction<Comment>[]) => {
          return snapshots.map(snapshot => {
            const value = snapshot.payload.val();//payload.valで実データを取得
            return new Comment({ key: snapshot.payload.key, ...value});//スプレッド演算子、配列を動的な長さにできる
          })
        })
      );
  }

  addComment(comment: string): void{
    if(comment){
      this.commentsRef.push(new Comment({user:this.currentUser, message:comment}));
      this.comment = "";
    }
  }

  updateComment(comment: Comment):void{
    const { key, message } = comment;

    this.commentsRef.update(key, { message });
    //key名をメッセージとしてvalue値にmessage定数に格納されている値をセットします
  }

  deleteComment(comment: Comment):void{
    this.commentsRef.remove(comment.key);
    //key名をメッセージとしてvalue値にmessage定数に格納されている値をセットします
  }
}
