import { BaseShape } from './BaseShape';
import { Tool } from './Tool';

export interface CreatorTool extends Tool {
    buildShape(): BaseShape;
}
