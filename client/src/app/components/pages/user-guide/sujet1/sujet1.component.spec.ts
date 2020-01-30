import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sujet1Component } from './sujet1.component';

describe('Sujet1Component', () => {
    let component: Sujet1Component;
    let fixture: ComponentFixture<Sujet1Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Sujet1Component],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Sujet1Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
