import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSidenavModule} from '@angular/material';

import { MatSliderModule } from '@angular/material/slider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ColorLightnessComponent } from 'src/app/components/shared/color-picker/color-lightness/color-lightness.component';
import {CustomInputComponent} from 'src/app/components/shared/inputs/custom-input/custom-input.component';
import {HexInputComponent} from 'src/app/components/shared/inputs/hex-input/hex-input.component';
import {NumberInputComponent} from 'src/app/components/shared/inputs/number-input/number-input.component';
import { AbstractModalComponent } from './abstract-modal/abstract-modal.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';

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
  declarations: [
    AbstractModalComponent,
    ColorPickerComponent,
    ColorLightnessComponent,
    NumberInputComponent,
    CustomInputComponent,
    HexInputComponent
  ],

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
    MatSidenavModule,
    ColorPickerComponent,
    NumberInputComponent,
    CustomInputComponent,
    HexInputComponent
  ],
})
export class SharedModule {}
