import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthpageService } from 'src/app/authpage.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {
  email: any;

  constructor(public authpageService:AuthpageService, public route:Router) { }

  ngOnInit() {
  }
  async forget(){
    this.authpageService.forget(this.email).then(() =>{
      console.log('forget link sent');
    
      this.route.navigate(['/login'])
    }
    

    ).catch((error)=> {
      console.log(error);
    })

  }

}
