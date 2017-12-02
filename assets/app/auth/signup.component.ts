import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { error } from "util";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent{
    myForm : FormGroup; 

    constructor(private authService : AuthService){}

    onSubmit(){
        // console.log(this.myForm);
        console.log('Form Submit');
        const user = new User(this.myForm.value.email, 
                              this.myForm.value.password, 
                              this.myForm.value.firstName,
                              this.myForm.value.lastName,
                            );
        // console.log(user); 
        // console.log(this.authService);     

        this.authService.signup(user).subscribe(data=>console.log(data));                          
        this.myForm.reset();
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
            ]),
            password: new FormControl(null, Validators.required),
        });
    }
}