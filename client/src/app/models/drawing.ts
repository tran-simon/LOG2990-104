import { BaseShape } from './shapes/base-shape';

export class Drawing {
  name: string;
  tags: string[];
  data: BaseShape[];
  id: string;

  constructor(name: string, tags: string[], data: BaseShape[], id?: string) {
    this.name = name;
    this.tags = tags;
    this.data = data;
    if (id) {
      this.id = id;
    }
  }
}
