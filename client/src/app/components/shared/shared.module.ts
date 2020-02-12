import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSidenavModule,
} from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlphaComponent } from 'src/app/components/shared/color-picker/color-strip/alpha/alpha.component';
import { ColorLightnessComponent } from 'src/app/components/shared/color-picker/color-strip/color-lightness/color-lightness.component';
import { CustomInputComponent } from 'src/app/components/shared/inputs/custom-input/custom-input.component';
import { HexInputComponent } from 'src/app/components/shared/inputs/hex-input/hex-input.component';
import { NumberInputComponent } from 'src/app/components/shared/inputs/number-input/number-input.component';
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
    MatRadioModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
  ],
  declarations: [
    AbstractModalComponent,
    ColorPickerComponent,
    ColorLightnessComponent,
    AlphaComponent,
    NumberInputComponent,
    CustomInputComponent,
    HexInputComponent,
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
    MatRadioModule,
    MatSidenavModule,
    ColorPickerComponent,
    NumberInputComponent,
    CustomInputComponent,
    HexInputComponent,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
  ],
})
export class SharedModule {}
