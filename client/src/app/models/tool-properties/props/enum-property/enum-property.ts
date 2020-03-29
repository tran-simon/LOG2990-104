import { Property } from '@tool-properties/props/property';

export class EnumProperty implements Property<string>{//todo: rename to other property
  value: string;
  choices: string[];

  constructor(value: string, choices: any) {//todo
    this.value = value;
    this.choices = Object.values(choices);
  }
}
