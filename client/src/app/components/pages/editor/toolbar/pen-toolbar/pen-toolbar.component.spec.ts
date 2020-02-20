import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenToolbarComponent } from 'src/app/components/pages/editor/toolbar/pen-toolbar/pen-toolbar.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { PenToolProperties } from 'src/app/models/tool-properties/pen-tool-properties';
import { PenTool } from 'src/app/models/tools/creator-tools/stroke-tools/pen-tool';
import { EditorService } from 'src/app/services/editor.service';

describe('PenToolbarComponent', () => {
  let component: PenToolbarComponent;
  let fixture: ComponentFixture<PenToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PenToolbarComponent],
      providers: [EditorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenToolbarComponent);
    const editorService = TestBed.get(EditorService);
    component = fixture.componentInstance;
    component.tool = new PenTool(editorService);
    component.toolProperties = new PenToolProperties();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
