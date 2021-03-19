import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
  {path:"new",component:NewUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],//app-routeing.moduleが親,これがuser.moduleとuser-routing.moduleを読み込む
  exports: [RouterModule]
})
export class UsersRoutingModule { }
