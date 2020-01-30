import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sujet4Component } from './sujet4.component';

describe('Sujet4Component', () => {
    let component: Sujet4Component;
    let fixture: ComponentFixture<Sujet4Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Sujet4Component],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Sujet4Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
