import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { LineToolProperties } from 'src/app/models/tool-properties/line-tool-properties';
import { LineTool } from 'src/app/models/tools/creator-tools/line-tool/line-tool';
import { EditorService } from 'src/app/services/editor.service';

import { LineToolbarComponent } from 'src/app/components/pages/editor/toolbar/line-toolbar/line-toolbar.component';

describe('LineToolbarComponent', () => {
  let component: LineToolbarComponent;
  let fixture: ComponentFixture<LineToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [LineToolbarComponent],
      providers: [EditorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineToolbarComponent);
    const editorService = TestBed.get(EditorService);
    component = fixture.componentInstance;
    component.tool = new LineTool(editorService);
    component.toolProperties = new LineToolProperties();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
