import { Injectable } from '@angular/core';
import { AuthpageService } from '../authpage.service';
import {Firestore, collection, addDoc, query, where, collectionData} from '@angular/fire/firestore'
import { Observable } from 'rxjs';


export class profile {
  id?: string;
  userId: string;
  Fullname: string;
  Email: string;

   constructor(userId: string, Fullname:string, Email: string){
    this.userId = userId, 
    this.Fullname = Fullname,
    this.Email = Email
   }
}


@Injectable({
  providedIn: 'root'
})
export class UserprofileService {
  userId: any;

    constructor(public firestore: Firestore, public authpageService:AuthpageService)  {
    
    this.authpageService.getProfile().then(user =>{
      this.userId = user.uid
      console.log(this.userId)
    })
    
    }
    addProfile(profileP: profile){
        profileP.userId = this.userId;

        const profileRef = collection(this.firestore, 'Users')
        return addDoc(profileRef, profileP)

    }
    getUserProfile(userId:any): Observable<profile[]>{
      const userRef = collection(this.firestore,'Users');

      const  queryall = query(userRef);

      return collectionData(queryall) as Observable<profile[]>;
    }
}
