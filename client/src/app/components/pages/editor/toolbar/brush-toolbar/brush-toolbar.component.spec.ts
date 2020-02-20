import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { BrushToolProperties } from 'src/app/models/tool-properties/brush-tool-properties';
import { BrushTool } from 'src/app/models/tools/creator-tools/stroke-tools/brush-tool';
import { EditorService } from 'src/app/services/editor.service';

import { BrushToolbarComponent } from 'src/app/components/pages/editor/toolbar/brush-toolbar/brush-toolbar.component';

describe('BrushToolbarComponent', () => {
  let component: BrushToolbarComponent;
  let fixture: ComponentFixture<BrushToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [BrushToolbarComponent],
      providers: [EditorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushToolbarComponent);
    const editorService = TestBed.get(EditorService);
    component = fixture.componentInstance;
    component.tool = new BrushTool(editorService);
    component.toolProperties = new BrushToolProperties();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
