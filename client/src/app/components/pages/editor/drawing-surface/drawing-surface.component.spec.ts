import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/components/shared/shared.module';

import { DrawingSurfaceComponent } from './drawing-surface.component';

describe('DrawingSurfaceComponent', () => {
  let component: DrawingSurfaceComponent;
  let fixture: ComponentFixture<DrawingSurfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [DrawingSurfaceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
