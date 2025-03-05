import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();


//Créer un User
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const newUser = await prisma.user.create({
      data: {
        email,
        password
      },
    });

    res.status(201).send(newUser); // 201 pour "Created"
  } catch (error) {
    console.error("Erreur lors de la création du User :", error);
    res.status(500).send({ error: "Erreur lors de la création du User." });
  }
};
