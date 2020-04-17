import { Selection } from '@models/tools/editing-tools/selection-tool/selection';

describe('Selection', () => {

  let selection: Selection;

  beforeEach(() => {
    selection = new Selection();
  });

  it('can clear selection', () => {
    selection.clear();
    expect(selection.shapes).toEqual([]);
  });
});
