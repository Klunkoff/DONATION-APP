import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, User, signOut, createUserWithEmailAndPassword } from '@firebase/auth';
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

  constructor( private router: Router, private firestore: AngularFirestore ) { }

  // TODO - creating errorParser for database errors - maybe ? 

  get isLoggedIn() {
    // console.log(this.auth.currentUser?.uid);

    this.uid = this.auth.currentUser?.uid;

    return !!this.auth.currentUser?.uid;
  }

  getUserUID() {
    return this.auth.currentUser?.uid;
  }


  async registerWithEmailAndPassword(firstName: string, lastName: string, email: string, password: string) {

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      debugger
      this.user = userCredential.user;
      this.uid = this.user.uid;

      this.router.navigate(['catalog']);

      const userData = this.firestore.collection('users')
        .doc(userCredential.user.uid).set({ firstName: firstName, lastName: lastName, email: email });

    } catch (error) {
      const errorCode = (error as { code: string }).code;
      const errorMessage = (error as { message: string }).message;
      console.log(errorCode, errorMessage);
    }
  }


  async loginWithEmailAndPassword(email: string, password: string) {

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.user = userCredential.user;
      this.uid = this.user.uid;

      // TODO - remove it after all checks !!!
      this.findUserByUID(this.uid)

      this.router.navigate(['catalog']);

    } catch (error) {
      const errorCode = (error as { code: string }).code;
      const errorMessage = (error as { message: string }).message;
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

    // TODO - remove it after all checks !!!
    console.log(docData.data());

    return docData.data();
  }

  async addRequestItemToUserRequests(postID: string) {

    const uid = this.getUserUID();

    if (uid !== undefined) {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, { requestedItems: arrayUnion(postID) });
    }
  }

  getUserRequests$(): Observable<string[]> {

    const uid = this.getUserUID();
    console.log(uid);
    

    const userRequests = from(this.findUserByUID(uid!)).pipe(map((user) => {

      if (user !== undefined) {
        return user['requestedItems'];
      }

    }));

    return userRequests;
  }





}






