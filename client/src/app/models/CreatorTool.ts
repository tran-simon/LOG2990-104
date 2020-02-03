import { BaseShape } from './BaseShape';
import { Tool } from './Tool';

export abstract class CreatorTool extends Tool {
    abstract buildShape(): BaseShape;
}
