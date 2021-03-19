import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { ChatComponent } from '../chat/chat.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    TimelineRoutingModule,
    SharedModule,
  ]
})
export class TimelineModule { }
