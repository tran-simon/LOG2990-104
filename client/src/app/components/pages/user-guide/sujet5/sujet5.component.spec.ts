import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sujet5Component } from './sujet5.component';

describe('Sujet5Component', () => {
    let component: Sujet5Component;
    let fixture: ComponentFixture<Sujet5Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Sujet5Component],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Sujet5Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
