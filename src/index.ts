export enum ClassePersonagem {
  Guerreiro = "GUERREIRO",
  Mago = "MAGO",
  Arqueiro = "ARQUEIRO",
  Ladino = "LADINO",
}

export enum Raridade {
  Comum = "COMUM",
  Incomum = "INCOMUM",
  Raro = "RARO",
  Epico = "ÉPICO",
  Lendario = "LENDÁRIO",
}

export interface IItem {
  nome: string;
  descricao: string;
  raridade: Raridade;
  usar(personagem: Personagem): void;
}

export class Personagem {
  private _vida: number;
  private _vidaMax: number;
  private _inventario: IItem[] = [];
  private static readonly MAX_INVENTARIO = 5;

  public readonly nome: string;
  public classe: ClassePersonagem;
  public ataque: number;
  public defesa: number;

  constructor(
    nome: string,
    classe: ClassePersonagem,
    vida: number,
    ataque: number,
    defesa: number,
  ) {
    this.nome = nome;
    this.classe = classe;
    this.ataque = ataque;
    this.defesa = defesa;
    this._vida = vida;
    this._vidaMax = vida;
  }

  get vida(): number {
    return this._vida;
  }

  set vida(valor: number) {
    if (valor < 0) {
      this._vida = 0;
    } else if (valor > this._vidaMax) {
      this._vida = this._vidaMax;
    } else {
      this._vida = valor;
    }
  }

  get vidaMaxima(): number {
    return this._vidaMax;
  }

  get inventario(): IItem[] {
    return [...this._inventario];
  }

  estaVivo(): boolean {
    return this._vida > 0;
  }

  atacar(alvo: Personagem) {
    const dano = this.ataque - alvo.defesa;
    alvo._vida -= dano;

    console.log(`${this.nome} atacou ${alvo.nome} e causou ${dano} de dano.`);
    return dano;
  }

  exibirStatus(): void {
    console.log(`\n📊 Status de ${this.nome} (${this.classe})`);
    console.log(`Vida: ${this._vida}/${this._vidaMax}`);
    console.log(`Ataque: ${this.ataque}`);
    console.log(`Defesa: ${this.defesa}`);
    console.log(
      `Itens: ${this._inventario.length}/${Personagem.MAX_INVENTARIO}`,
    );
  }
}
