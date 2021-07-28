import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  collapsed = true;
  isAuthenticated = false;
  private userSub!: Subscription;

  constructor(private dataStorageServ: DataStorageService, private authServ: AuthService){}

  ngOnInit(){
    this.userSub = this.authServ.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;//it cannot be null right?(Can be it is changed to behavior subject from normal subject)//But it could have worked even if it was a normal subject because isAuthenticated is only going to be false and this method is not executing (we just set the subscription only) until the user observable emits the data which happens only if some one logsin or signsup
    });
  }
  
  onSaveData(){
    this.dataStorageServ.storeRecipes();
  }

  onFetchData(){
    this.dataStorageServ.fetchRecipes().subscribe();//here subscribe is for namesake as the it is mandatory
  }

  onLogout(){
    this.authServ.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}
