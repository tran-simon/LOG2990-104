import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineToolbarComponent } from './line-toolbar.component';

describe('LineToolbarComponent', () => {
  let component: LineToolbarComponent;
  let fixture: ComponentFixture<LineToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LineToolbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
