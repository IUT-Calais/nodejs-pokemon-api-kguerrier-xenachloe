import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

export const server = app.listen(port);

export function stopServer() {
  server.close();
}


app.get('/pokemon-cards', async (_req: Request, res: Response) => {
  const pokemon = await prisma.pokemonCard.findMany()
  res.status(200).send(pokemon);
});

app.get('/pokemons-cards/:id', (_req: Request, res: Response) => {
  res.status(200).send(`Pokemon ${_req.params.id}`);
});