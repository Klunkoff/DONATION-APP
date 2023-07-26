import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService) {}

  login(loginForm: NgForm): void {

    if(loginForm.invalid) {
      return;
    };

    const { email, password } = loginForm.value;
    this.userService.loginWithEmailAndPassword(email, password);

    console.log(loginForm.value);
    
  }

}
