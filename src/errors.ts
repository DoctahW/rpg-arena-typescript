export class PersonagemMortoError extends Error {
  constructor(nomePersonagem: string) {
    super(`${nomePersonagem} está morto e não pode realizar esta ação!`);
    this.name = "PersonagemMortoError";
  }
}

export class ManaInsuficienteError extends Error {
  constructor(nomePersonagem: string) {
    super(
      `${nomePersonagem} não possui mana suficiente para realizar esta ação!`,
    );
    this.name = "ManaInsuficienteError";
  }
}

export class InventarioCheioError extends Error {
  constructor(nomePersonagem: string) {
    super(
      `${nomePersonagem} está com o inventario cheio e não pode carregar mais itens!`,
    );
    this.name = "InventarioCheioError";
  }
}
