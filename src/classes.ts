import { ClassePersonagem } from "./index";
import { Personagem } from "./index";
import { PersonagemMortoError } from "./errors";

export class Guerreiro extends Personagem {
  constructor(nome: string) {
    super(nome, ClassePersonagem.Guerreiro, 150, 18, 10);
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

    console.log(`${this.nome} usou GOLPE BRUTAL em ${alvo.nome}!`);
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
      throw new Error("Mana insuficiente");
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
