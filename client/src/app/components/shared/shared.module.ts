import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';

import {MatSliderModule} from '@angular/material/slider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AbstractModalComponent} from './abstract-modal/abstract-modal.component';
import {TextFormComponent} from './text-form/text-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule, BrowserAnimationsModule, MatSliderModule,
    MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule
  ],
  declarations: [AbstractModalComponent, TextFormComponent],
  entryComponents: [AbstractModalComponent],
  exports: [AbstractModalComponent,
    ReactiveFormsModule, FormsModule, CommonModule, MatSliderModule, MatDialogModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, TextFormComponent
  ],
})
export class SharedModule {
}
