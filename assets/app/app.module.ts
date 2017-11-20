import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppComponent } from "./app.component";
import {MessageComponent} from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component'
import { messageInputComponent } from './messages/message.input.component';
@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        messageInputComponent
    ],
    imports: [BrowserModule, FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}