import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorLuminanceComponent } from './color-luminance.component';

describe('ColorLightnessComponent', () => {
    let component: ColorLuminanceComponent;
    let fixture: ComponentFixture<ColorLuminanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ColorLuminanceComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorLuminanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
