import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';



@Component({
  selector: 'ac-root',
  template: `
    <ac-header></ac-header>
    <div class="page">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
