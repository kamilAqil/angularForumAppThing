import{Component,OnInit} from "@angular/core";
import {MessageService} from "./message.service";
import { Message } from "./message.model";
import { NgForm } from "@angular/forms";
@Component({
    selector: 'app-message-input',
    templateUrl:'./message-input-component.html',
    
})

export class messageInputComponent implements OnInit{
    message:Message;
    constructor(private messageService: MessageService){

    }

    onSubmit(form: NgForm){
        console.log(form);
        console.log('clicked submit');
        const message = new Message(form.value.content, 'Kamil');
        this.messageService.addMessage(message)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
        form.resetForm();
    }
    ngOnInit(){
        this.messageService.messageIsEdit.subscribe(
            (message:Message)=>this.message = message
        );
    }
}