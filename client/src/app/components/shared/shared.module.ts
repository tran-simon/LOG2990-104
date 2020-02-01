import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSidenavModule } from '@angular/material';

import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbstractModalComponent } from './abstract-modal/abstract-modal.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorLuminanceComponent } from './color-picker/color-luminance/color-luminance.component';
import { NumberFormComponent } from './inputs/number-form/number-form.component';
import { CustomInputComponent } from './inputs/custom-input/custom-input.component';
import {NumberInputComponent} from "./inputs/number-input/number-input.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSidenavModule,
    ],
    declarations: [AbstractModalComponent, NumberFormComponent, ColorPickerComponent, ColorLuminanceComponent, CustomInputComponent, NumberInputComponent],
    entryComponents: [AbstractModalComponent],
  exports: [
    AbstractModalComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatSliderModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NumberFormComponent,
    MatSidenavModule,
    ColorPickerComponent,
    CustomInputComponent,
    NumberInputComponent,
  ],
})
export class SharedModule {}
