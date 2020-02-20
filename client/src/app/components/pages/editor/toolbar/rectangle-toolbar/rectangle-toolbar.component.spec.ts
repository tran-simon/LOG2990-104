import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { RectangleToolProperties } from 'src/app/models/tool-properties/rectangle-tool-properties';
import { RectangleTool } from 'src/app/models/tools/creator-tools/shape-tools/rectangle-tool';
import { EditorService } from 'src/app/services/editor.service';

import { RectangleToolbarComponent } from 'src/app/components/pages/editor/toolbar/rectangle-toolbar/rectangle-toolbar.component';

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
    const editorService = TestBed.get(EditorService);
    component = fixture.componentInstance;
    component.tool = new RectangleTool(editorService);
    component.toolProperties = new RectangleToolProperties();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
