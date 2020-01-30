import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sujet6Component } from './sujet6.component';

describe('Sujet6Component', () => {
    let component: Sujet6Component;
    let fixture: ComponentFixture<Sujet6Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Sujet6Component],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Sujet6Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
