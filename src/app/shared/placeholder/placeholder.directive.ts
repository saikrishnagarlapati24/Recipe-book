import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective{
  constructor(public viewContRef: ViewContainerRef){} //this gives more info and tools about the place where we use this directive
}