/*tslint:disable:no-string-literal*/
/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { EditorComponent } from 'src/app/components/pages/editor/editor/editor.component';
import { BrushToolbarComponent } from 'src/app/components/pages/editor/toolbar/brush-toolbar/brush-toolbar.component';
import { LineToolbarComponent } from 'src/app/components/pages/editor/toolbar/line-toolbar/line-toolbar.component';
import { PenToolbarComponent } from 'src/app/components/pages/editor/toolbar/pen-toolbar/pen-toolbar.component';
import { RectangleToolbarComponent } from 'src/app/components/pages/editor/toolbar/rectangle-toolbar/rectangle-toolbar.component';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar/toolbar.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { EditorService } from 'src/app/services/editor.service';*/
import { Command } from './command';
import { CommandReceiver } from './command-receiver';

export class MockCommand extends Command {
  execute() {
    //
  }
  undo() {
    //
  }
}

describe('CommandReceiver', () => {
  let commandReceiver: CommandReceiver;
  /*let fixture: ComponentFixture<EditorComponent>;
  let editor: EditorComponent;*/

  /*BeforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        PenToolbarComponent,
        BrushToolbarComponent,
        RectangleToolbarComponent,
        LineToolbarComponent,
        EditorComponent,
        DrawingSurfaceComponent,
      ],
      imports: [SharedModule, RouterTestingModule],
      providers: [EditorService],
    }).compileComponents();
  }));*/

  beforeEach(() => {
    /*fixture = TestBed.createComponent(EditorComponent);
    fixture.detectChanges();
    editor = fixture.componentInstance;*/
    commandReceiver = new CommandReceiver();
  });

  it('can add and execute a command', () => {
    const command = new MockCommand();
    const executeSpy = spyOn(command, 'execute');
    commandReceiver.add(command);
    expect(commandReceiver['_revertedCommands'].length).toEqual(0);
    expect(commandReceiver['_commands'].length).toEqual(1);
    expect(executeSpy).toHaveBeenCalled();
  });

  it('can undo last command', () => {
    const command = new MockCommand();
    const undoSpy = spyOn(command, 'undo');
    commandReceiver.add(command);
    commandReceiver.undo();
    expect(commandReceiver['_revertedCommands'].length).toEqual(1);
    expect(commandReceiver['_commands'].length).toEqual(0);
    expect(undoSpy).toHaveBeenCalled();
  });

  it('can redo last undone command', () => {
    const command = new MockCommand();
    const executeSpy = spyOn(command, 'execute');
    commandReceiver.add(command);
    commandReceiver.undo();
    commandReceiver.redo();
    expect(commandReceiver['_revertedCommands'].length).toEqual(0);
    expect(commandReceiver['_commands'].length).toEqual(1);
    expect(executeSpy).toHaveBeenCalledTimes(2);
  });
});
