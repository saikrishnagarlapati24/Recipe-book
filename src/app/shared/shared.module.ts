import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({//see 9th vid of 22nd section, why we have to export everything in the imports here(because we want other modules to access what is in this module, which is otherwise not possible)
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
  imports: [
    CommonModule,//we don't want to use these modules and components in this module but in other modules
  ],
  exports: [//looks like we can export anything here
    AlertComponent,
    LoadingSpinnerComponent,//this is directly declared and imported in the auth component as it is giving some error here(solved, he also got the same error in the 11th video. Reason: We can only use what we declare in that module or declared in the module imported into that module. So, we have to import shared module into auth module)
    PlaceholderDirective,
    DropdownDirective,
    CommonModule,
  ]//now where ever we import this shared module, we have access to these things in that module
})
export class SharedModule{ }