import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';


const prisma = new PrismaClient();

export const app = express();
const port = process.env.PORT || 3000;

export const server = app.listen(port);

export function stopServer() {
  server.close();
}

app.get('/pokemon-cards', async (_req: Request, res: Response) => {
  const pokemon = await prisma.pokemonCard.findMany()
  res.status(200).send(pokemon);
});

app.get('/pokemon-cards/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const pokemon = await prisma.pokemonCard.findUnique({
    where: { id: parseInt(id) },
  });
  if (pokemon) {
    res.status(200).json(pokemon);
  } else {
    res.status(404).send(`Pokémon avec l'ID ${id} non trouvé`);
  }
});