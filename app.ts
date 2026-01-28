import { Arena } from "./src/arena";
import { Guerreiro, Mago, Arqueiro } from "./src/classes";

const arthur = new Guerreiro("Arthur");
const carlos = new Mago("Carlos");
const malu = new Arqueiro("Malu");

const arena = new Arena();
arena.addPersonagem(arthur);
arena.addPersonagem(carlos);
arena.addPersonagem(malu);

arena.listarLutadores();

arena.batalhar();
