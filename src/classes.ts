import { ClassePersonagem } from "./index";
import { Personagem } from "./index";
import { PersonagemMortoError, ManaInsuficienteError } from "./errors";

export class Guerreiro extends Personagem {
  private _defesaReduzida: boolean = false;
  private _defesaOriginal: number;

  constructor(nome: string) {
    super(nome, ClassePersonagem.Guerreiro, 150, 18, 10);
    this._defesaOriginal = this.defesa;
  }

  golpeBrutal(alvo: Personagem): number {
    if (!this.estaVivo()) {
      throw new PersonagemMortoError(this.nome);
    }
    if (!alvo.estaVivo()) {
      throw new PersonagemMortoError(alvo.nome);
    }

    const dano = this.ataque * 2 - alvo.defesa;
    alvo.vida -= dano;

    this.defesa = Math.floor(this._defesaOriginal / 2);
    this._defesaReduzida = true;

    console.log(`${this.nome} usou GOLPE BRUTAL em ${alvo.nome}!`);
    console.log(`${this.nome} vai ter sua defesa reduzida!`);
    console.log(`Causou ${dano} de dano devastador!`);
    console.log(`${alvo.nome} ficou com ${alvo.vida}/${alvo.vidaMaxima} HP`);
    return dano;
  }
}

export class Mago extends Personagem {
  private _mana: number;
  private _manaMax: number;

  constructor(nome: string) {
    super(nome, ClassePersonagem.Mago, 80, 8, 5);
    this._mana = 100;
    this._manaMax = 100;
  }

  get mana(): number {
    return this._mana;
  }

  set mana(valor: number) {
    if (valor < 0) {
      this._mana = 0;
    } else if (valor > this._manaMax) {
      this._mana = this._manaMax;
    } else {
      this._mana = valor;
    }
  }

  get manaMaxima(): number {
    return this._manaMax;
  }

  bolaDeFogo(alvo: Personagem): number {
    const custoMana = 30;
    if (this.mana < custoMana) {
      throw new ManaInsuficienteError(this.nome);
    }

    this.mana -= custoMana;

    const dano = this.ataque * 3 - alvo.defesa;
    alvo.vida -= dano;

    console.log(`${this.nome} usou BOLA DE FOGO em ${alvo.nome}!`);
    console.log(`Causou ${dano} de dano devastador!`);
    console.log(`${alvo.nome} ficou com ${alvo.vida}/${alvo.vidaMaxima} HP`);
    return dano;
  }

  meditar(): void {
    const regeneracaoMana = 25;
    this.mana += regeneracaoMana;
    console.log(`${this.nome} meditou e recuperou ${regeneracaoMana} de mana!`);
  }

  override exibirStatus(): void {
    super.exibirStatus();
    console.log(`Mana: ${this.mana}/${this.manaMaxima}`);
  }
}

export class Arqueiro extends Personagem {
  private _mana: number;
  private _manaMax: number;

  constructor(nome: string) {
    super(nome, ClassePersonagem.Arqueiro, 100, 14, 6);
    this._mana = 50;
    this._manaMax = 50;
  }

  get mana(): number {
    return this._mana;
  }

  set mana(valor: number) {
    if (valor < 0) {
      this._mana = 0;
    } else if (valor > this._manaMax) {
      this._mana = this._manaMax;
    } else {
      this._mana = valor;
    }
  }

  get manaMaxima(): number {
    return this._manaMax;
  }

  override atacar(alvo: Personagem): number {
    const critico = Math.random() <= 0.3;
    let dano = this.ataque - alvo.defesa;

    if (critico) {
      dano *= 2;
      console.log(
        `CRITICO! ${this.nome} acertou um tiro perfeito em ${alvo.nome}`,
      );
    } else {
      console.log(`${this.nome} atirou em ${alvo.nome}`);
    }
    alvo.vida -= dano;
    console.log(`${this.nome} causou ${dano} de dano em ${alvo.nome}`);
    console.log(`${alvo.nome} ficou com ${alvo.vida}/${alvo.vidaMaxima} HP`);
    return dano;
  }

  flechaPrecisa(alvo: Personagem): number {
    const custoMana = 15;
    this._mana -= custoMana;

    if (custoMana > this._mana) {
      throw new ManaInsuficienteError(this.nome);
    }

    const dano = this.ataque * 2 - Math.floor(alvo.defesa / 2);
    alvo.vida -= dano;

    console.log(`🎯 ${this.nome} disparou uma FLECHA PRECISA em ${alvo.nome}!`);
    console.log(`Gastou ${custoMana} de mana (${this._mana}/${this._manaMax})`);
    console.log(`Causou ${dano} de dano perfurante!`);
    console.log(`${alvo.nome} ficou com ${alvo.vida}/${alvo.vidaMaxima} HP`);

    return dano;
  }

  override exibirStatus(): void {
    super.exibirStatus();
    console.log(`Mana: ${this._mana}/${this._manaMax}`);
  }
}
