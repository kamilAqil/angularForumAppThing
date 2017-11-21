import{Component} from "@angular/core";
import {MessageService} from "./message.service";
import { Message } from "./message.model";
@Component({
    selector: 'app-message-input',
    templateUrl:'./message-input-component.html',
    
})

export class messageInputComponent {
    constructor(private messageService: MessageService){

    }

    onSave(value: string){
        const message = new Message(value, 'Kamil');
        this.messageService.addMessage(message);
    }
}