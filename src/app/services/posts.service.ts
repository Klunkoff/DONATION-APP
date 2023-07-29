import { Injectable } from '@angular/core';
import { DonationPost } from '../types/donationPost';
import { addDoc, collection } from 'firebase/firestore'; 
import { db } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  async addNewPostToDB(donationPost: DonationPost) {

    try {

      const newPost = await addDoc(collection(db, 'posts'), {

        postTitle: donationPost.postTitle,
        description: donationPost.description,
        category: donationPost.category,
        contact: donationPost.contact,
        photo: donationPost.photo,
        userIUD: donationPost.userIUD

        // TODO - userIUD logic !
        // TODO - category logic !
      });

      // TODO - navigation
      
    } catch (error) {
      
      console.log('Can not add the post', error);
    }

  }



}
