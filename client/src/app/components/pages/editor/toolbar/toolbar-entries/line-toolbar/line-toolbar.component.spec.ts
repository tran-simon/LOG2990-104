import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { LineToolProperties } from 'src/app/models/tool-properties/line-tool-properties';

import { LineToolbarComponent } from './line-toolbar.component';

describe('LineToolbarComponent', () => {
  let component: LineToolbarComponent;
  let fixture: ComponentFixture<LineToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [LineToolbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineToolbarComponent);
    component = fixture.componentInstance;
    component.toolProperties = new LineToolProperties();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
