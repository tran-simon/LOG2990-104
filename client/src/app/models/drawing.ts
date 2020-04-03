import { BaseShape } from './shapes/base-shape';

export class Drawing {
  name: string;
  tags: string[];
  data: BaseShape[];
  previewURL: string;
  _id: string;

  constructor(name: string, tags: string[], data: BaseShape[], previewURL: string, _id?: string) {
    this.name = name;
    this.tags = tags;
    this.data = data;
    this.previewURL = previewURL;
    if (_id) {
      this._id = _id;
    }
  }
}
