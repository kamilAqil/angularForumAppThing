import { Component } from '@angular/core';
import {Message} from './messages/message.model';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    message : Message = new Message('first message','kamil');
    // messages = [
    //     new Message('first message', 'kamil'),
    //     new Message('second message', 'kamil'),
    // ];
}