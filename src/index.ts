import express from 'express';
import { pokemonRouter } from './Pokemon/pokemon.router';
import { UserRouter } from './User/user.router';

export const app = express();

const port = process.env.PORT || 3000;

export const server = app.listen(port);

export function stopServer() {
  server.close();
}

app.use('/users', UserRouter);
app.use('/pokemon-cards', pokemonRouter);
