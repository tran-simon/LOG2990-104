import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSidenavModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbstractModalComponent } from './abstract-modal/abstract-modal.component';
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
        MatIconModule,
        MatInputModule,
        MatSidenavModule,
        MatExpansionModule,
    ],
    declarations: [AbstractModalComponent, NumberFormComponent],
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
        MatExpansionModule,
    ],
})
export class SharedModule {}
