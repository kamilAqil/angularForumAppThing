import {Component} from "@angular/core";
import { Message } from './message.model';
@Component({
    selector: 'app-message-list',
    template:`
                <div class="col-md-8 col-md-offset-2">
                    <app-message [message]="message" 
                    *ngFor="let message of messages"></app-message>
                </div>
    `
})

export class MessageListComponent { 
    messages: Message[] = [
        new Message('first message', 'kamil'),
        new Message('second message', 'kamil'),
        new Message('third message', 'kamil')
    ];
}