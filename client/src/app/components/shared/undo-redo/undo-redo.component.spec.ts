import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';

import { UndoRedoComponent } from './undo-redo.component';

describe('UndoRedoComponent', () => {
  let component: UndoRedoComponent;
  let fixture: ComponentFixture<UndoRedoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [UndoRedoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndoRedoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should undo on call', () => {
    const undoSpy = spyOn(component.editorService.commandReceiver, 'undo');
    component.onUndo();
    expect(undoSpy).toHaveBeenCalled();
  });
  it('should redo on call', () => {
    const redoSpy = spyOn(component.editorService.commandReceiver, 'redo');
    component.onRedo();
    expect(redoSpy).toHaveBeenCalled();
  });
});
