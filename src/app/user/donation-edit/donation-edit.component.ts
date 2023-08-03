import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DonationPost } from 'src/app/types/donationPost';
import { PostsService } from 'src/app/services/posts.service';


@Component({
  selector: 'app-donation-edit',
  templateUrl: './donation-edit.component.html',
  styleUrls: ['./donation-edit.component.css']
})
export class DonationEditComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    ) { }
    
    categoriesData = ['food', 'clothes', 'shoes', 'tech', 'books', 'cutlery', 'home', 'time', 'games', 'other'];
    postToEdit: DonationPost = { postTitle: '', description: '', category: '', contact: '', photo: '', userUID: '' };
    // editedPost: DonationPost = { postTitle: '', description: '', category: '', contact: '', photo: '', userUID: '' };

    postID: string = '';
    selectedCategory: string = '';


  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {

      const currentID = params['id'];

      if(currentID) {

        this.postID = currentID;
        this.getPost();
      }
    });
  }

  onSelectedCategory(event: any): void {
    this.selectedCategory = event;
  }

  async getPost() {

    const post = await this.postsService.getPostByUID(this.postID);

    if(post) {
      this.postToEdit.postTitle = post['postTitle'];
      this.postToEdit.description = post['description'];
      this.postToEdit.category = post['category'];
      this.selectedCategory = post['category'];
      this.postToEdit.contact = post['contact'];
      this.postToEdit.photo = post['photo'];
      this.postToEdit.userUID = post['userUID'];
      
    }

    console.log(post);
    
  }


  editPost(editDonationForm: NgForm) {

    if (editDonationForm.invalid) {
      return;
    }



  }


}
