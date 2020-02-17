import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { RectangleToolProperties } from 'src/app/models/tool-properties/rectangle-tool-properties';

import { RectangleToolbarComponent } from './rectangle-toolbar.component';

describe('RectangleToolbarComponent', () => {
  let component: RectangleToolbarComponent;
  let fixture: ComponentFixture<RectangleToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [RectangleToolbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleToolbarComponent);
    component = fixture.componentInstance;
    component.toolProperties = new RectangleToolProperties();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
