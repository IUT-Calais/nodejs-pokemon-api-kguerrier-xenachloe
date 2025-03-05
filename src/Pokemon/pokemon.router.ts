import { Router } from 'express';
import { createPokemon, deletePokemon, getIdPokemon, getPokemon } from './pokemon.controller';

export const pokemonRouter = Router();

//Route pour la liste des Pokémons
pokemonRouter.get('/', getPokemon);

//Route pour la carte d'un Pokémon (avec le ID)
pokemonRouter.get('/:id', getIdPokemon);

//Route pour créer le Pokémon
pokemonRouter.post('/create', createPokemon);

//Route pour modifier le Pokémon (avec le ID)
//pokemonRouter.put("/update/:id", updatePokemon);

//Route pour supprimer le Pokémon
pokemonRouter.delete('/delete/:id', deletePokemon);