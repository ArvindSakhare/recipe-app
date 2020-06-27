import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinner } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
    
    declarations: [
        AlertComponent,
        LoadingSpinner,    
        DropdownDirective
    ],

    imports: [CommonModule],
    
    exports: [
        AlertComponent,
        LoadingSpinner,    
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule {}