import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';//CommonModuleはモジュールに必要な機能が含まれている、これがないとモジュールとして機能しない
import { FormsModule } from '@angular/forms';
import { CommentDatePipe } from '../pipes/comment-date.pipe';


@NgModule({
  declarations: [
    CommentDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
    FormsModule,
    CommentDatePipe,
  ]
})
export class SharedModule { }
