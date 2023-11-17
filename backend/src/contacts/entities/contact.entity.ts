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

export class Telephone {
  constructor(
    private _contatoId: number,
    private _telefone: string,
  ) {}
  public get telefone(): string {
    return this._telefone;
  }
  public set telefone(telefone: string) {
    this._telefone = telefone;
  }
  public get contatoId(): number {
    return this._contatoId;
  }
  public set contatoId(contatoId: number) {
    this._contatoId = contatoId;
  }
}
