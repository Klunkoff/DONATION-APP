import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth ,signInWithEmailAndPassword, User, signOut } from '@firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth = getAuth();
  user: User | undefined;
  uid: any;

  constructor( private router: Router ) { }

  // TODO - creating errorParser for database errors - maybe ? 

  get isLoggedIn() {
    return !!getAuth().currentUser;
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
