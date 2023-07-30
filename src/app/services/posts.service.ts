import { Injectable } from '@angular/core';
import { DonationPost } from '../types/donationPost';
import { addDoc, collection } from 'firebase/firestore'; 
import { db } from 'src/main';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private router: Router) { }


  async addNewPostToDB(donationPost: DonationPost) {

    try {

      const newPost = await addDoc(collection(db, 'posts'), {

        postTitle: donationPost.postTitle,
        description: donationPost.description,
        category: donationPost.category,
        contact: donationPost.contact,
        photo: donationPost.photo,
        userUID: donationPost.userUID
      });

      this.router.navigate(['catalog']);
      
    } catch (error) {
      console.log('Can not add the post', error);
    }

  }



}
