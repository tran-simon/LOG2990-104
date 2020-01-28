import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSidenavModule } from '@angular/material';

import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbstractModalComponent } from './abstract-modal/abstract-modal.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorLuminanceComponent } from './color-picker/color-square/color-luminance/color-luminance.component';
import { ColorSquareComponent } from './color-picker/color-square/color-square.component';
import { NumberFormComponent } from './forms/number-form/number-form.component';

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
        MatInputModule,
        MatSidenavModule,
    ],
    declarations: [AbstractModalComponent, NumberFormComponent, ColorPickerComponent, ColorSquareComponent, ColorLuminanceComponent],
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
        MatInputModule,
        NumberFormComponent,
        MatSidenavModule,
        ColorPickerComponent,
    ],
})
export class SharedModule {}
