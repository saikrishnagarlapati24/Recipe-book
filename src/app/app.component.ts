import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  //code tried by me and it worked
  // rec = true;

  // switch(ev: any){
  //   if(ev.s === 'rec'){
  //     this.rec = true;
  //   }
  //   else{
  //     this.rec = false;
  //   }
  // }

  constructor(private authServ: AuthService){}

  ngOnInit(){
    this.authServ.autologin();
  }

}
