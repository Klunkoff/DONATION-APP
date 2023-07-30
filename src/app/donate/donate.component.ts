import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DonationPost } from '../types/donationPost';
import { UserService } from '../services/user.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent {

  constructor(private userService: UserService, private postsService: PostsService) { }

  categoriesData = ['food', 'clothes', 'shoes', 'tech', 'books', 'cutlery', 'home', 'time', 'games', 'other'];
  donationPost: DonationPost = { postTitle: '', description: '', category: '', contact: '', photo: '', userIUD: '' };
  selectedCategory: string = '';


  onSelectedCategory(event: any): void {

    this.selectedCategory = event;
    console.log(this.selectedCategory);

  }


  post(donationForm: NgForm) {

    if (donationForm.invalid) {
      return;
    }

    const { postTitle, description, contactInformation, postPhoto } = donationForm.value;
    this.donationPost.postTitle = postTitle;
    this.donationPost.description = description;
    this.donationPost.contact = contactInformation;
    this.donationPost.photo = postPhoto;
    this.donationPost.category = this.selectedCategory;

    this.postsService.addNewPostToDB(this.donationPost);

  }


}
