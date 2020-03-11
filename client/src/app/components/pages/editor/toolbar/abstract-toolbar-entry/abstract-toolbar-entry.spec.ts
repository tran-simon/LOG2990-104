/* tslint:disable:no-string-literal */
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/abstract-toolbar-entry/abstract-toolbar-entry';
import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { ToolType } from 'src/app/models/tools/tool-type.enum';
import { ColorsService } from 'src/app/services/colors.service';
import { EditorService } from 'src/app/services/editor.service';

export class AbstractToolbarEntryMock extends AbstractToolbarEntry<ToolProperties> {
  constructor(editorService: EditorService) {
    super(editorService, 'MockType' as ToolType);
  }
}

describe('AbstractToolbarEntry', () => {
  let toolbarEntry: AbstractToolbarEntry<ToolProperties>;
  let editorService: EditorService;
  const type: ToolType = 'MockType' as ToolType;
  const toolProperties = {} as ToolProperties;

  beforeEach(() => {
    editorService = new EditorService(new ColorsService());
    editorService.tools.set(type, { toolProperties } as CreatorTool);
    toolbarEntry = new AbstractToolbarEntryMock(editorService);
  });

  it('can get tool properties', () => {
    expect(toolbarEntry.toolProperties).toEqual(toolProperties);
  });

  it('throws error if tool does not exist', () => {
    const invalidType = 'invalid_type' as ToolType;
    toolbarEntry['type'] = invalidType;
    expect(() => toolbarEntry.toolProperties).toThrow(new Error('Tool not found error: ' + invalidType));
  });
});
