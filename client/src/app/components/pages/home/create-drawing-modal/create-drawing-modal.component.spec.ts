import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDrawingModalComponent } from './create-drawing-modal.component';

describe('CreateDrawingModalComponent', () => {
    let component: CreateDrawingModalComponent;
    let fixture: ComponentFixture<CreateDrawingModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateDrawingModalComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateDrawingModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
