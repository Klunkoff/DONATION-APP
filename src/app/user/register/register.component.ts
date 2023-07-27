import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService: UserService) {}

  register(registerForm: NgForm): void {

    if(registerForm.invalid) {
      return;
    }

    const { firstName, lastName, email, password, rePassword } = registerForm.value;
    this.userService.registerWithEmailAndPassword(firstName, lastName, email, password);
  }

}
