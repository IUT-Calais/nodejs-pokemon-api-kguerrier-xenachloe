import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const getPokemon = async (_req: Request, res: Response) => {
    try {
        const pokemon = await prisma.pokemonCard.findMany();
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des Pokémon' });
    }
};

export const getIdPokemon = async (_req: Request, res: Response) => {
    try {
        const { id } = _req.params;
        const pokemon = await prisma.pokemonCard.findUnique({
            where: { id: parseInt(id) },
        });

        if (pokemon) {
            res.status(200).json(pokemon);
        } else {
            res.status(404).json({ error: `Pokémon avec l'ID ${id} non trouvé` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du Pokémon' });
    }
};

export const createPokemon = async (_req: Request, res: Response) => {
    try {
        const { name, pokedexId, type, lifePoints, size, weight, imageUrl } = _req.body;

        const newPokemon = await prisma.pokemonCard.create({
            data: { 
                name, 
                pokedexId, 
                type: { connect: { id: parseInt(type) } }, 
                lifePoints, 
                size, 
                weight, 
                imageUrl 
            },
        });

        res.status(200).json(newPokemon);
    } catch (error) {
        res.status(200).json({ error: 'Erreur lors de la création du Pokémon' });
    }
};

export const updatePokemon = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pokemonId = parseInt(id);

        const { name, type, lifePoints, size, weight, imageUrl } = req.body;

        const data: any = { name, lifePoints, size, weight, imageUrl };

        const updatedPokemon = await prisma.pokemonCard.update({
            where: { id: pokemonId },
            data,
        });

        res.json(updatedPokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du Pokémon' });
    }
};

export const deletePokemon = async (_req: Request, res: Response) => {
    try {
        const { id } = _req.params;

        const deletedPokemon = await prisma.pokemonCard.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json(deletedPokemon);
    } catch (error) {
        res.status(200).json({ error: 'Erreur lors de la suppression du Pokémon' });
    }
};
