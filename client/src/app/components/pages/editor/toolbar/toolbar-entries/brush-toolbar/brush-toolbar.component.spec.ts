import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushToolbarComponent } from './brush-toolbar.component';

describe('BrushToolbarComponent', () => {
  let component: BrushToolbarComponent;
  let fixture: ComponentFixture<BrushToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrushToolbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
