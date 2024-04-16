import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthpageService } from 'src/app/authpage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: FormGroup;
  
 

  constructor(public formBuilder:FormBuilder, 
    public loadingCtrl: LoadingController,public authpageService:AuthpageService,public route: Router, public firestore:AngularFirestore) { }

  ngOnInit() {
    
    this.form = this.formBuilder.group({
      fullname: ['', [Validators.required]],
  
      email : ['',[Validators.required, Validators.email,
      Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")]],
  
      password : ['',[Validators.required]]
  
      }) }
      get invalid() {
        return this.form.invalid; 
      }

      get errorControl(){
        return this.form.controls;
      }
        async signup(){
        const loading = await this.loadingCtrl.create();
        loading.present();
        if(this.form?.valid){
      const user = await this.authpageService.registerUser(this.form.value.email,this.form.value.password).catch((error)=> {
       console.log(error);
       loading.dismiss()
      })

      if(user){loading.dismiss()
        this.route.navigate(['/login']) 
         
      }else
      
      {
        console.log('provide correct values');
      }
    }
          
  }
}
