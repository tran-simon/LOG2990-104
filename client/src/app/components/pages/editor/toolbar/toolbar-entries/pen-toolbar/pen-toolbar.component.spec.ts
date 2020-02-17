import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar-entries/pen-toolbar/pen-toolbar.component';

describe('PenToolbarComponent', () => {
  let component: PenToolbarComponent;
  let fixture: ComponentFixture<PenToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PenToolbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
