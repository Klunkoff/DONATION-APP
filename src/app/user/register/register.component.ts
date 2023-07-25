import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  register(registerForm: NgForm): void {

    if(registerForm.invalid) {
      return;
    }

    console.log(registerForm.value);
  }

}
