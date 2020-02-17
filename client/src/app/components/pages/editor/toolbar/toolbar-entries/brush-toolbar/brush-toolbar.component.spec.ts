import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { BrushToolProperties } from 'src/app/models/tool-properties/brush-tool-properties';

import { BrushToolbarComponent } from './brush-toolbar.component';

describe('BrushToolbarComponent', () => {
  let component: BrushToolbarComponent;
  let fixture: ComponentFixture<BrushToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [BrushToolbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushToolbarComponent);
    component = fixture.componentInstance;
    component.toolProperties = new BrushToolProperties();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
