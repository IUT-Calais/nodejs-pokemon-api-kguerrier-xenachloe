import { Router } from 'express';
import { createPokemon, deletePokemon, getIdPokemon, getPokemon, updatePokemon } from './pokemon.controller';

export const pokemonRouter = Router();

pokemonRouter.get('/', getPokemon);
pokemonRouter.get('/:id', getIdPokemon);
pokemonRouter.post('/create', createPokemon);
pokemonRouter.patch('/update/:id', updatePokemon);
pokemonRouter.delete('/delete/:id', deletePokemon);