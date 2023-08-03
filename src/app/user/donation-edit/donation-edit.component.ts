import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-donation-edit',
  templateUrl: './donation-edit.component.html',
  styleUrls: ['./donation-edit.component.css']
})
export class DonationEditComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }
    
    categoriesData = ['food', 'clothes', 'shoes', 'tech', 'books', 'cutlery', 'home', 'time', 'games', 'other'];
    postID: string = '';
    selectedCategory = '';


  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {

      const currentID = params['id'];

      if(currentID) {
        this.postID = currentID;
        console.log(this.postID);
        
      }

    });
  }

  onSelectedCategory(event: any): void {
    this.selectedCategory = event;
  }


  editPost(editDonationForm: NgForm) {

    if (editDonationForm.invalid) {
      return;
    }



  }


}
