import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { randomThoughts } from '../utils/randomize-thoughts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  currentThought: string = ''; 
  
  ngOnInit(): void {
    this.currentThought = this.getRandomThought();
  }

  
  isLogged(): boolean {
    return this.userService.isLoggedIn;
  }

  getRandomThought() {
    return randomThoughts();
  }

}
