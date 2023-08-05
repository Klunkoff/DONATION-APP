import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userPosts: Array<any> = [];
  userUID: string | undefined;

  constructor(
    private postsService: PostsService,
    private userService: UserService,
    private router: Router
    ) {}


  ngOnInit(): void {
    this.userUID = this.userService.getUserUID();
    this.getUserPosts();
  }


  async getUserPosts() {

    if(this.userUID !== undefined) {
      const posts = await this.postsService.getUserPostsFromDB(this.userUID);
      this.userPosts = posts;
    }
  }

  userHasNoPosts(): boolean {
    return this.userPosts.length == 0 ? true : false;
  }

  editDonation(postID: string) {
    this.router.navigate(['users/edit'], { queryParams: { id: postID }});
  }


  getUserDonations(): number {
    return this.userPosts.length;
  }

}
