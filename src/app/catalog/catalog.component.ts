import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {

  allPosts: Array<any> = [];
  userRequestedItems: string[] | undefined = [];
  spinner: boolean = true;

  constructor(
    private postsService: PostsService, 
    private userService: UserService
    ) {}

  ngOnInit(): void {
    this.getAllPosts();
    this.getUserRequestedItems();
  }

  async getAllPosts() {
   
    const posts = await this.postsService.getAllPostsFromDB();
    this.allPosts = posts;
    
    this.spinner = false;
  }

  clickRequest(postID: string): void {

    this.userService.addRequestItemToUserRequests(postID);
    this.getUserRequestedItems();
  }

  getUserRequestedItems(): void {

    this.userService.getUserRequests$()
    .pipe(tap(requests => this.userRequestedItems = requests))
    .subscribe();
  }

  alreadyRequested(postID: string): boolean {

    if(this.userRequestedItems) {
      return this.userRequestedItems.includes(postID);
    }

    return false;
  }

}
