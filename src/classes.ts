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

class Mago extends Personagem {
  constructor(nome: string) {
    super(nome, ClassePersonagem.Mago, 80, 8, 5);
  }
}
