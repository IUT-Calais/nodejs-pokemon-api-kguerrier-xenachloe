import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';

const prisma = new PrismaClient();

async function main() {
  await prisma.type.deleteMany();
  await prisma.type.createMany({
    data: [
      { name: 'Normal' },
      { name: 'Fire' },
      { name: 'Water' },
      { name: 'Grass' },
      { name: 'Electric' },
      { name: 'Ice' },
      { name: 'Fighting' },
      { name: 'Poison' },
      { name: 'Ground' },
      { name: 'Flying' },
      { name: 'Psychic' },
      { name: 'Bug' },
      { name: 'Rock' },
      { name: 'Ghost' },
      { name: 'Dragon' },
      { name: 'Dark' },
      { name: 'Steel' },
      { name: 'Fairy' },
    ],
  });

  await prisma.pokemonCard.create({
      data: 
        { name: 'Squirtle', pokedexId: 7, type: {connect:{id:1}}, lifePoints: 44, imageUrl:'' },
      
    });
  console.log('Seed completed!');

  await prisma.user.create({
    data: 
    { email: "admin@gmail.com", password: "admin" },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
