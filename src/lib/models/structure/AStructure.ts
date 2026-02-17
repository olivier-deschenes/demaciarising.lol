export abstract class Structure {
  protected name: string;
  protected level: number;

  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }

  public getName(): string {
    return this.name;
  }

  public getLevel(): number {
    return this.level;
  }

  public toString(): string {
    return `Structure: ${this.name}, Level: ${this.level}`;
  }
}
