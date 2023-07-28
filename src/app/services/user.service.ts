import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth ,signInWithEmailAndPassword, User, signOut, createUserWithEmailAndPassword } from '@firebase/auth';


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


    // createUserWithEmailAndPassword(this.auth, email, password)
    //   .then((userCredential) => {
    //     this.user = userCredential.user;
    //     this.uid = userCredential.user.uid;
    //      return this.firestore.collection('users')
    //       .doc(userCredential.user.uid)
    //       .set({firstName: firstName, lastName: lastName, email: email });
          
          
    //   })
    //   .then(() => {
    // 
    //     this.router.navigate(['catalog']);
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage);
    //   }
    // );
  

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      debugger
      this.user = userCredential.user;
      this.uid = this.user.uid;
      
      this.router.navigate(['catalog']);
      
      const userData = this.firestore.collection('users')
      .doc(userCredential.user.uid).set({ firstName: firstName, lastName: lastName, email: email });
      console.log(userData);

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
