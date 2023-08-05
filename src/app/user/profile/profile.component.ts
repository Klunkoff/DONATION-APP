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
  userInfo: any;

  spinner: boolean = true;

  constructor(
    private postsService: PostsService,
    private userService: UserService,
    private router: Router
    ) {}


  ngOnInit(): void {
    this.userUID = this.userService.getUserUID();
    this.getUserPosts();
    this.getUserInformation();
  }


  async getUserPosts() {

    if(this.userUID !== undefined) {
      const posts = await this.postsService.getUserPostsFromDB(this.userUID);
      this.userPosts = posts;

      this.spinner = false;
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

  async getUserInformation() {

    if(this.userUID) {
      const userData = await this.userService.findUserByUID(this.userUID);
      this.userInfo = userData;

      console.log(userData);
      
    }
  }

}
