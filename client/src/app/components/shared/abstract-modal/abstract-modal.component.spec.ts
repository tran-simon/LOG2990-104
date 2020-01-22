import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatFormFieldModule} from '@angular/material';

import { AbstractModalComponent } from './abstract-modal.component';

describe('AbstractModalComponent', () => {
    let component: AbstractModalComponent;
    let fixture: ComponentFixture<AbstractModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [MatDialogModule, MatFormFieldModule ],
            declarations: [AbstractModalComponent],
          providers: [
            { provide: MAT_DIALOG_DATA, useValue: {} },
            { provide: MatDialogRef, useValue: {} }
          ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AbstractModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
