import { Component } from '@angular/core';
import { AuthpageService } from '../authpage.service';

import { UserprofileService, profile } from '../Services/userprofile.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userId: any;
Fullname: string;
  Email: string;
  profUser: profile[];

  constructor(public authpageService:AuthpageService, 
    public userprofileService:UserprofileService, private toastCtr:ToastController,) { }

    ngOnInit() {
  
      this.authpageService.getProfile().then(user =>{
        this.userId = user.uid;

        console.log(this.userId);

        this.userprofileService.getUserProfile(this.userId).subscribe(res =>{
          this.profUser = res
          console.log(this.profUser)
        })

        })
    }
    saveProfile(){
  
      this.userprofileService.addProfile({userId:"", Fullname:this.Fullname, Email:this.Email}).then(async ()=>{
      const toast= await this.toastCtr.create({
        message:"User Added Successful!",
        duration:2000
        
      })
      toast.present()
  
      }).catch(async(error) =>{
        const toast = await this.toastCtr.create({
          message:error,
          duration:2000
  
        })
        toast.present()
      })
  }
  
  
  }
  
