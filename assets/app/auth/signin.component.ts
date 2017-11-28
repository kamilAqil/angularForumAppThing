import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'app-signIn',
    templateUrl: './signIn.component.html'
})

export class SignInComponent {
    myForm: FormGroup;

    onSubmit() {
        console.log(this.myForm);
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
            ]),
            password: new FormControl(null, Validators.required),
        });
    }

}