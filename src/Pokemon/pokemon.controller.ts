import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Liste des Pokémons
export const getPokemon = async (_req: Request, res: Response) => {
    try {
        const pokemon = await prisma.pokemonCard.findMany();
        res.status(200).send(pokemon);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la récupération des Pokémon' });
    }
};

//Carte d'un Pokémon
export const getIdPokemon = async (_req: Request, res: Response) => {
    try {
        const { id } = _req.params;
        const pokemon = await prisma.pokemonCard.findUnique({
            where: { id: parseInt(id) },
        });

        if (pokemon) {
            res.status(200).send(pokemon);
        } else {
            res.status(404).send({ error: `Pokémon avec l'ID ${id} non trouvé` });
        }
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la récupération du Pokémon' });
    }
};

//Créer un Pokémon
export const createPokemon = async (req: Request, res: Response) => {
  try {
    const { name, pokedexId, type, lifePoints, size, weight, imageUrl } = req.body;
    const newPokemon = await prisma.pokemonCard.create({
      data: {
        name,
        pokedexId,
        type: { connect: { id: parseInt(type) } },
        lifePoints,
        size: size ?? null, // Gérer les valeurs nulles
        weight: weight ?? null,
        imageUrl: imageUrl ?? null,
      },
    });

    res.status(201).send(newPokemon); // 201 pour "Created"
  } catch (error) {
    console.error("Erreur lors de la création du Pokémon :", error);
    res.status(500).send({ error: "Erreur lors de la création du Pokémon." });
  }
};


//Modifier un Pokémon
// export const updatePokemon = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { name, pokedexId, type, lifePoints, size, weight, imageUrl } = req.body;
//         const updatedPokemon = await prisma.pokemonCard.update({
//             where: { id: parseInt(id) },
//             data: name: name,
//                 pokedexId: pokedexId,
//                 type: type,
//                 lifePoints: lifePoints,
//                 size: size,
//                 weight: weight,
//                 imageUrl: imageUrl,
//         });
//         res.status(200).send(updatedPokemon);

//     } catch (error) {
//         res.status(200).send({ error: "Erreur lors de la modification du Pokémon" });
//     }
// };

//Supprimer un Pokémon
export const deletePokemon = async (_req: Request, res: Response) => {
    try {
        const { id } = _req.params;

        const deletedPokemon = await prisma.pokemonCard.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).send(deletedPokemon);
    } catch (error) {
        res.status(200).send({ error: 'Erreur lors de la suppression du Pokémon' });
    }
};
