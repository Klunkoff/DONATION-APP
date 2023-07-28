import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, User, signOut, createUserWithEmailAndPassword } from '@firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth = getAuth();
  user: User | undefined;
  uid: any;

  constructor( private router: Router, private firestore: AngularFirestore ) { }

  // TODO - creating errorParser for database errors - maybe ? 

  get isLoggedIn() {
    console.log(!!getAuth().currentUser);
    
    return !!getAuth().currentUser;
  }


  async registerWithEmailAndPassword(firstName: string, lastName: string, email: string, password: string) {

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      this.user = userCredential.user;
      this.uid = this.user.uid;

      console.log(this.user);
      console.log(getAuth().currentUser);
      
  
      this.router.navigate(['catalog']);

      await this.firestore.collection('users')
      .doc(userCredential.user.uid).set({ firstName, lastName, email });
      

    } catch (error) {
      const errorCode = (error as { code: string }).code;
      const errorMessage = (error as { message: string }).message;
      console.log(errorCode, errorMessage);
    }
  }


  async loginWithEmailAndPassword (email: string, password: string) {

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.user = userCredential.user;
      this.uid = this.user.uid;
      
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
      
      this.router.navigate(['home']);
      
    } catch (error) {
      const errorCode = (error as { code: string }).code;
      const errorMessage = (error as { message: string }).message;
      console.log(errorCode, errorMessage);
    }
  }


}
