export class Drawing {
  name: string;
  tags: string[];
  data: string;
  id: string;

  constructor(name: string, tags: string[], data: string, id?: string) {
    this.name = name;
    this.tags = tags;
    this.data = data;
    if (id) {
      this.id = id;
    }
  }
}
