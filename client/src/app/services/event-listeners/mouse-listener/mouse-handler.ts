export interface MouseHandler {
  handleDblClick(e: MouseEvent): boolean | void;
  handleMouseMove(e: MouseEvent): boolean | void;
  handleMouseDown(e: MouseEvent): boolean | void;
  handleMouseUp(e: MouseEvent): boolean | void;
  handleMouseLeave(e: MouseEvent): boolean | void;
  handleClick(e: MouseEvent): boolean | void;
  handleContextMenu(e: MouseEvent): boolean | void;

  handleMouseEvent(e: MouseEvent): boolean | void;
}
