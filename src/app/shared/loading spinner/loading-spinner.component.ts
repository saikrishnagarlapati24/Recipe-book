import { Component } from "@angular/core";

@Component({
  selector: 'app-loading-spinner',
  template: '<div class="lds-dual-ring"></div>', //1
  // template: '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>', //2
  // template: '<div id="img1" class="img"></div><div id="img2" class="img"></div><div id="img3" class="img"></div><div id="img4" class="img"></div><div id="img5" class="img"></div>', //3
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent{

}