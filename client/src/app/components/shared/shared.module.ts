import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlphaComponent } from 'src/app/components/shared/color-picker/color-strip/alpha/alpha.component';
import { ColorLightnessComponent } from 'src/app/components/shared/color-picker/color-strip/color-lightness/color-lightness.component';
import { CustomInputComponent } from 'src/app/components/shared/inputs/custom-input/custom-input.component';
import { HexInputComponent } from 'src/app/components/shared/inputs/hex-input/hex-input.component';
import { NumberInputComponent } from 'src/app/components/shared/inputs/number-input/number-input.component';
import { AbstractModalComponent } from './abstract-modal/abstract-modal.component';
import { ConfirmModalComponent } from './abstract-modal/confirm-modal/confirm-modal/confirm-modal.component';
import { ColorHistoryComponent } from './color-picker/color-history/color-history.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { NameInputComponent } from './inputs/name-input/name-input.component';
import { EnumPropertyInputComponent } from './inputs/property-inputs/enum-property-input/enum-property-input.component';
import { NumericPropertyInputComponent } from './inputs/property-inputs/numeric-property-input/numeric-property-input.component';
import { TagInputComponent } from './inputs/tag-input/tag-input.component';
import { TagListInputComponent } from './inputs/tag-list-input/tag-list-input.component';

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
    HttpClientModule,
    MatSelectModule,
  ],
  declarations: [
    AbstractModalComponent,
    ColorPickerComponent,
    ColorLightnessComponent,
    AlphaComponent,
    NumberInputComponent,
    CustomInputComponent,
    HexInputComponent,
    TagInputComponent,
    TagListInputComponent,
    NameInputComponent,
    ColorHistoryComponent,
    ConfirmModalComponent,
    NumericPropertyInputComponent,
    EnumPropertyInputComponent,
  ],
  entryComponents: [AbstractModalComponent, ConfirmModalComponent],
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
    TagInputComponent,
    TagListInputComponent,
    NameInputComponent,
    ColorHistoryComponent,
    AlphaComponent,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    NumericPropertyInputComponent,
    EnumPropertyInputComponent,
  ],
})
export class SharedModule {}
