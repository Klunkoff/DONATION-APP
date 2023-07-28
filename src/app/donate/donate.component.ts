import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent {

  categoriesData = ['food', 'clothes', 'shoes', 'tech', 'books', 'cutlery', 'home', 'time', 'games', 'other'];

  
 post(donationForm: NgForm) {

  if(donationForm.invalid) {
    return;
  }

 }


}
