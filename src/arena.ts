import { Personagem } from ".";

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
      console.log(
        `${lutador.nome} | ${lutador.classe} | HP: ${lutador.vidaMaxima}`,
      ),
    );
  }
}
