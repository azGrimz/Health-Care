import { prisma } from "./prisma";
import { hash } from "bcryptjs";

async function createUser() {
    try {
      const hashSenha = await hash('123', 8);

      const newUser = await prisma.usuario.create({
        data: {
          nomeUsuario: 'admin',
          emailUsuario: 'admin@admin.com',
          senhaUsuario: hashSenha,
          roleUsuario: 'ADMIN'
        },
      });
  
      console.log('Novo usuário criado:', newUser);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  createUser();