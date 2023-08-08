import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, User, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from 'src/main';
import { Observable, from, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  auth = getAuth();
  user: User | undefined;
  uid: string | undefined;

  errorFromDB: string = '';

  constructor( private router: Router, private firestore: AngularFirestore ) { }

  // TODO - creating errorParser for database errors - maybe ? 

  get isLoggedIn() {
    return !!this.uid;
  }


  checkUserStatus() {
    onAuthStateChanged(this.auth, (user) => {

      if(user) {
        this.uid = user.uid;

      } else {
        this.uid = undefined;
      }
    });
  }


  getUserUID() {
    return this.auth.currentUser?.uid;
  }


  async registerWithEmailAndPassword(firstName: string, lastName: string, email: string, password: string) {

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
     
      this.user = userCredential.user;
      this.uid = this.user.uid;

      this.router.navigate(['catalog']);

      const userData = this.firestore.collection('users')
        .doc(userCredential.user.uid).set({ firstName, lastName, email });

    } catch (error) {
      const errorCode = (error as { code: string }).code;
      const errorMessage = (error as { message: string }).message;

      this.errorFromDB = 'This email is already registered!';

      console.log(errorCode, errorMessage);
    }
  }


  async loginWithEmailAndPassword(email: string, password: string) {

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.user = userCredential.user;
      this.uid = this.user.uid;

      this.router.navigate(['catalog']);

    } catch (error) {
      const errorCode = (error as { code: string }).code;
      const errorMessage = (error as { message: string }).message;

      this.errorFromDB = 'Email or Password do not match!';

      console.log(errorCode, errorMessage);
    }
  }


  async logout() {

    try {
      await signOut(this.auth);
      this.uid = undefined;

      this.router.navigate(['home']);

    } catch (error) {
      const errorCode = (error as { code: string }).code;
      const errorMessage = (error as { message: string }).message;
      console.log(errorCode, errorMessage);
    }
  }


  async findUserByUID(uid: string) {

    const docRef = doc(db, 'users', uid);
    const docData = await getDoc(docRef);

    return docData.data();
  }


  async updateUserByID(uid: string, editProfileForm: any) {

    try {
      const userRef = doc(db, 'users', uid);
      const docData = await updateDoc(userRef, editProfileForm);
      
    } catch (error) {
      console.log('Can not update the document', error);
    }
  }


  async addRequestItemToUserRequests(postID: string) {

    const uid = this.getUserUID();

    if (uid) {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, { requestedItems: arrayUnion(postID) });
    }
  }

  getUserRequests$(): Observable<string[]> {

    const uid = this.getUserUID();
    const userRequests = from(this.findUserByUID(uid!)).pipe(map((user) => {

      if (user) {
        return user['requestedItems'];
      }
    }));

    return userRequests;
  }

}






