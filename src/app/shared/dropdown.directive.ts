// import { Directive, HostBinding, HostListener } from "@angular/core";

// @Directive({
//   selector: '[appDropdown]',
// })
// export class DropdownDirective{
//   @HostBinding('class.open') isOpen:boolean = false

//   @HostListener('click') toggleOpen(){
//     this.isOpen =!this.isOpen;
//   }
// }


//for closing the dropdown wherever clicked(copied from provided)
import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    // console.log(this.elRef);
    // console.log(this.elRef.nativeElement);
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}