import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { addDoc, collection, getDocs, query, where, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'; 
import { db } from 'src/main';

import { DonationPost } from '../types/donationPost';

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

  async getAllPostsFromDB() {

    const posts: Array<any> = [];

    try {
      const queryFirebaseData = await getDocs(collection(db, 'posts'));

      queryFirebaseData.forEach((firebaseDoc) => {
        const post = {key: firebaseDoc.id, data: firebaseDoc.data()};
        posts.push(post);
      });

    } catch (error) {
      console.log('Can not getting the firebase data', error);
    }

    return posts;
  }

  
  async getUserPostsFromDB (uid: string) {

    const posts: Array<any> = [];

    try {
      const queryRef = query(collection(db, 'posts'), where('userUID', '==', uid));
      const queryFirebaseData = await getDocs(queryRef);
      
      queryFirebaseData.forEach((firebaseDoc) => {
        const post = {key: firebaseDoc.id, data: firebaseDoc.data()};
        posts.push(post);
      });
      
    } catch (error) {
      console.log('Can not getting the firebase data', error);
    }

    return posts;
  }


  async getPostByID(postID: string) {

    try {
      const docRef = doc(db, 'posts', postID);
      const docData = await getDoc(docRef);
  
      return docData.data();
      
    } catch (error) {
      console.log('Can not getting the firebase data', error);

      return undefined;
    }
  }


  async updatePostByID(postID: string, postToEdit: any) {

    try {
      const docRef = doc(db, 'posts', postID);
      const docData = await updateDoc(docRef, postToEdit);
      
    } catch (error) {
      console.log('Can not update the document', error);
    }
  }


  async deletePostByID(postID: string) {

    try {
      const docRef = doc(db, 'posts', postID);
      const docData = await deleteDoc(docRef);
      
    } catch (error) {
      console.log('Can not delete the document', error);
    }
  }

}
