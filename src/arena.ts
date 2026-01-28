import { Personagem } from ".";
import { Mago, Guerreiro, Arqueiro } from "./classes";
import { PersonagemMortoError, ManaInsuficienteError } from "./errors";

export class Arena {
  private lutadores: Personagem[] = [];

  addPersonagem(personagem: Personagem) {
    this.lutadores.push(personagem);
  }

  listarLutadores() {
    console.log("Lutadores na arena:");
    if (this.lutadores.length === 0) {
      console.log("Nenhum lutador na arena.");
    }
    this.lutadores.forEach((lutador) =>
      console.log(`${lutador.nome} | ${lutador.classe}`),
    );
  }

  batalhar() {
    const lutador1 =
      this.lutadores[Math.floor(Math.random() * this.lutadores.length)];
    const lutador2 =
      this.lutadores[Math.floor(Math.random() * this.lutadores.length)];
    if (!lutador1 || !lutador2) {
      console.log("Não há lutadores suficientes para a batalha.");
      return;
    }

    console.log(`Batalha entre ${lutador1.nome} e ${lutador2.nome}`);
    let turno = 1;
    let atacante = lutador1;
    let defensor = lutador2;

    while (lutador1.estaVivo() && lutador2.estaVivo()) {
      console.log(`Turno ${turno}: ${atacante.nome} ataca ${defensor.nome}`);
      console.log(`${atacante.nome} | Vida: ${atacante.vida}`);
      console.log(`${defensor.nome} | Vida: ${defensor.vida}`);

      try {
        this.executarAcao(atacante, defensor);
      } catch (error) {
        if (error instanceof PersonagemMortoError) {
          console.log(`${error.message}`);
          break;
        } else if (error instanceof ManaInsuficienteError) {
          console.log(`${error.message}`);
          console.log(`${atacante.nome} fez um ataque básico ao invés disso.`);
          atacante.atacar(defensor);
        } else {
          throw error;
        }
      }

      turno++;
      [atacante, defensor] = [defensor, atacante];

      console.log("");
    }
    const vencedor = lutador1.estaVivo() ? lutador1 : lutador2;
    const perdedor = lutador1.estaVivo() ? lutador2 : lutador1;

    console.log("=".repeat(25) + "\n");
    console.log(`\n${vencedor.nome} VENCEU A BATALHA!`);
    console.log(`${perdedor.nome} foi derrotado!`);
    console.log("=".repeat(25) + "\n");
  }
  private executarAcao(atacante: Personagem, defensor: Personagem): void {
    const chance = Math.random();

    if (atacante instanceof Guerreiro) {
      if (atacante.defesaReduzida) {
        atacante.defesaReduzida = false;
        atacante.defesa = atacante.defesaOriginal;
      }
      if (chance < 0.4) {
        atacante.golpeBrutal(defensor);
      } else {
        atacante.atacar(defensor);
      }
    } else if (atacante instanceof Mago) {
      if (atacante.mana >= 30 && chance < 1) {
        atacante.bolaDeFogo(defensor);
      } else if (atacante.mana < 30) {
        atacante.meditar();
      } else {
        atacante.atacar(defensor);
      }
    } else if (atacante instanceof Arqueiro) {
      if (atacante.mana >= 15 && chance < 0.5) {
        atacante.flechaPrecisa(defensor);
      } else {
        atacante.atacar(defensor);
      }
    }
  }
}
