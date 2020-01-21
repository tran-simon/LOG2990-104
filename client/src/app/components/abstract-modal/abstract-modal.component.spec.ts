import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractModalComponent } from './abstract-modal.component';

describe('AbstractModalComponent', () => {
    let component: AbstractModalComponent;
    let fixture: ComponentFixture<AbstractModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AbstractModalComponent],
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
