import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetGuideComponent } from './sujetGuide.component';

describe('SujetGuideComponent', () => {
    let component: SujetGuideComponent;
    let fixture: ComponentFixture<SujetGuideComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SujetGuideComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SujetGuideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
