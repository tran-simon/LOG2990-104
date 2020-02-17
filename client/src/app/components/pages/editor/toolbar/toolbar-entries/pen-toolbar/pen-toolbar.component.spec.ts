import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar-entries/pen-toolbar/pen-toolbar.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { PenToolProperties } from 'src/app/models/tool-properties/pen-tool-properties';

describe('PenToolbarComponent', () => {
  let component: PenToolbarComponent;
  let fixture: ComponentFixture<PenToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PenToolbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenToolbarComponent);
    component = fixture.componentInstance;
    component.toolProperties = new PenToolProperties();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
