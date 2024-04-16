import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Observable, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {User} from 'firebase/auth';





@Injectable({
  providedIn: 'root'
})
export class AuthpageService {
  userId: any;

  
  constructor(public ngFireAuth: AngularFireAuth, public firestore: AngularFirestore)  {
    
    
    }
  
  
  async registerUser(email: string, password: string){
   return await this.ngFireAuth.createUserWithEmailAndPassword(email, password)

  }
  async loginUser(email: string, password:string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }
  async forget(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }
  async signout(){
    return await this.ngFireAuth.signOut()
  }
  
  async getProfile(){
    return new Promise<User | null>((resolve, reject) => {

      this.ngFireAuth.onAuthStateChanged(user => {
        if(user){
          resolve(user)
        }else
        {
          resolve(null)
        }

      }, reject

      )
    })
  }

}
