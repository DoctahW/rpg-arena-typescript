import type { IItem } from ".";
import { Personagem, Raridade } from ".";

export class PocaoVida implements IItem {
  nome: string;
  descricao: string;
  raridade: Raridade;
  private cura: number;

  constructor(raridade: Raridade = Raridade.Comum) {
    this.raridade = raridade;

    switch (raridade) {
      case Raridade.Comum:
        this.cura = 20;
        break;
      case Raridade.Incomum:
        this.cura = 35;
        break;
      case Raridade.Raro:
        this.cura = 50;
        break;
      case Raridade.Epico:
        this.cura = 75;
        break;
      case Raridade.Lendario:
        this.cura = 100;
        break;
    }
    this.nome = `Poção de Vida (${raridade})`;
    this.descricao = `Restaura ${this.cura} pontos de vida`;
  }
  usar(personagem: Personagem): void {
    console.log(`${personagem.nome} bebeu a ${this.nome}!`);
    personagem.curar(this.cura);
  }
}
