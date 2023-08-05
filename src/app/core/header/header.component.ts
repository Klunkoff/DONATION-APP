import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.userService.checkUserStatus();
  }
  
  isLogged(): boolean {
    return this.userService.isLoggedIn;
  }

  logout(): void {
    this.userService.logout();
  }
  

}
