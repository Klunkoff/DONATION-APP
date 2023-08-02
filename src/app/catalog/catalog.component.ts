import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {

  allPosts: Array<any> = [];

  spinner: boolean = true;

  constructor(
    private postsService: PostsService, 
    private userService: UserService
    ) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  async getAllPosts() {
   
    const posts = await this.postsService.getAllPostsFromDB();
    this.allPosts = posts;
    
    this.spinner = false;
  }

  clickRequest(postID: string): void {

    this.userService.addRequestItemToUserRequests(postID);
    
  }

}
