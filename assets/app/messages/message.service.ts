import {Message} from "./message.model";
import {Http, Response, Headers} from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { EventEmitter } from "@angular/core";

@Injectable()

export class MessageService {

    private messages: Message[] = [];

    messageIsEdit = new EventEmitter<Message>();
     
    constructor(private http: Http){}

    addMessage(message: Message){
        console.log(this.messages);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        const token = localStorage.getItem('token') 
            ? '?token='+localStorage.getItem('token')
            : '';

        return this.http.post('http://localhost:3000/message'+token,body,{headers:headers})
            .map((response: Response)=>{
                const result = response.json();
                console.log('this is ad message result',result);
                const messageId = result.obj._id;
                console.log('this is ad message id', result.obj._id);
                const message = new Message(
                                                result.obj.content,
                                                result.obj.user, 
                                                result.obj._id);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response)=> Observable.throw(error.json()));
    }

    getMessages(){
        return this.http.get('http://localhost:3000/message')
            .map((response:Response)=>{
                const messages = response.json().obj;
                console.log('Get messages response',messages);
                let transformedMessages: Message[] = [];  
                for (let message of messages){
                    // console.log('This is fetched message of get message',message);
                    transformedMessages.push(new Message(
                                                        message.content, 
                                                        message.user.firstName,
                                                        message._id,
                                                        message.user._id));
                }  
                this.messages = transformedMessages;  
                return transformedMessages;      
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    editMessage(message:Message){
        this.messageIsEdit.emit(message);
    }

    updateMessage(message:Message){
        const body = JSON.stringify(message);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, { headers: headers })
            .map((response: Response) => response)
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteMessage(message: Message){
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        this.messages.splice(this.messages.indexOf(message),1);
        return this.http.delete('http://localhost:3000/message/' + message.messageId)
            .map((response: Response) => response)
            .catch((error: Response) => Observable.throw(error.json()));
    }

    
}