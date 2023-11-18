export class Contact {
  constructor(
    private _nome: string,
    private _idade: number,
  ) {}

  public get nome(): string {
    return this._nome;
  }
  public set nome(nome: string) {
    this._nome = nome;
  }
  public get idade(): number {
    return this._idade;
  }

  public set idade(idade: number) {
    this._idade = idade;
  }
}
