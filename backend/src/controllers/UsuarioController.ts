import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare, hash } from "bcryptjs";
import * as dotenv from 'dotenv';
import { sign } from "jsonwebtoken";
import { UploadImagesServices } from "../services/UploadImagesServices";
import DeleteImagesService from "../services/DeleteImagesService";
import obterDataEHoraBrasil from "../utils/getDateNow";

dotenv.config();

export class UsuarioController {

    async listarUsuarios(req: Request, res: Response) {
        const listarUsuarios = await prisma.usuario.findMany({
            where: {
                NOT: {
                    roleUsuario: 'ADMIN'
                }
            }
        });

        return res.json({ listarUsuarios });
    }

    async selecionarUsuario(req: Request, res: Response) {
        const id = Number(req.params.id);

        const selecionarUsuario = await prisma.usuario.findFirst({
            where: {
                idUsuario: id
            }
        });

        return res.json({ selecionarUsuario });
    }

    async adicionarUsuario(req: Request, res: Response) {
        const { nome, email, senha } = req.body;

        const hashSenha = await hash(senha, 8);

        const role = "USER";

        const emailRegistrado = await prisma.usuario.findFirst({
            where: {
                emailUsuario: email
            }
        });

        if (emailRegistrado) {
            return res.status(400).json({ error: 'Erro! Email já cadastrado!' });
        } else {

            const adicionarUsuario = await prisma.usuario.create({
                data: {
                    nomeUsuario: nome,
                    emailUsuario: email,
                    roleUsuario: role,
                    senhaUsuario: hashSenha
                }
            });

            return res.status(201).json({ message: 'Usuáro registrado com sucesso!', adicionarUsuario });
        }

    }

    async autenticarUsuario(req: Request, res: Response) {
        const { email, senha } = req.body;
        const secret = process.env.SECRET;

        const emailValido = await prisma.usuario.findFirst({

            where: {
                emailUsuario: email
            }
        });

        if (!emailValido) {
            return res.status(404).json({ error: 'Erro ao realizar o login!' });
        } else {

            const validarSenha = await compare(senha, emailValido.senhaUsuario);

            if (validarSenha === false) {
                return res.status(404).json({ error: 'Erro ao realizar o login!' });
            } else {
                const token = sign({ id: emailValido.idUsuario }, secret as string, { expiresIn: "1d" });
                const { idUsuario } = emailValido;

                return res.json({ message: 'Usuário logado com sucesso!', Usuario: { idUsuario, email }, token });
            }
        }
    }

    async autenticarAdmin(req: Request, res: Response) {
        const { email, senha } = req.body;
        const secret = process.env.SECRET;

        const verificarAdmin = await prisma.usuario.findFirst({
            where: {
                emailUsuario: email
            }
        });
        if (!verificarAdmin) {
            return res.status(404).json({ error: 'Erro! Email ou senha inválidos!' });
        } else {
            const validarSenha = await compare(senha, verificarAdmin.senhaUsuario);
            if (!validarSenha) {
                return res.status(404).json({ error: 'Erro! Email ou senha inválidos!' });
            } else if (verificarAdmin.roleUsuario !== 'ADMIN') {
                return res.status(401).json({ error: 'Erro! Usuário não possui autorização!' });
            } else {
                const token = sign({ id: verificarAdmin.idUsuario }, secret as string, { expiresIn: "1d" });
                const { idUsuario, roleUsuario } = verificarAdmin;

                return res.json({ message: 'Admin logado com sucesso!', Usuario: { idUsuario, email, roleUsuario }, token });
            }
        }

    }

    async atualizarUsuario(req: Request, res: Response) {
        const id = Number(req.params.id);

        const { nome, email, senha } = req.body;

        const hashSenha = await hash(senha, 8);

        if (senha == '') {
            await prisma.usuario.update({
                data: {
                    nomeUsuario: nome,
                    emailUsuario: email,
                },
                where: {
                    idUsuario: id
                }
            });
        } else {

            await prisma.usuario.update({
                data: {
                    nomeUsuario: nome,
                    emailUsuario: email,
                    senhaUsuario: hashSenha
                },
                where: {
                    idUsuario: id
                }
            });

        }

        return res.json({ message: 'Usuário atualizado com sucesso!' });
    }

    async deletarUsuario(req: Request, res: Response) {
        const id = Number(req.params.id);

        await prisma.comentario.deleteMany({
            where: {
                idUsuario: id
            }
        });

        const deletarUsuario = await prisma.usuario.delete({
            where: {
                idUsuario: id
            }
        });


        return res.json({ message: 'Usuário deletado com sucesso!', deletarUsuario });
    }


    async realizarComentario(req: Request, res: Response) {
        const { conteudo } = req.body;
        const situacaoFila  = Number(req.body.situacaoFila);

        const idUsuario = Number(req.query.idUsuario);
        const idEmpresa = Number(req.query.idEmpresa);

        const dataEHoraBrasil = obterDataEHoraBrasil().toString();

        const realizarComentario = await prisma.comentario.create({
            data: {
                conteudoComentario: conteudo,
                idUsuario: idUsuario,
                idEmpresa: idEmpresa,
                dataPublicacao: dataEHoraBrasil,
                situacaoFila: situacaoFila
            }
        });

        return res.json({ message: 'Comentário realizado com sucesso!', realizarComentario });
    }

    async adicionarExame(req: Request, res: Response) {

        if (req.file) {
            const { file } = req;

            const id = Number(req.query.id);

            const titulo = String(req.query.titulo);

            const uploadImagesServices = new UploadImagesServices();

            await uploadImagesServices.execute(file);

            const dataEHoraBrasil = obterDataEHoraBrasil().toString();

            try {
                const adicionarExame = await prisma.exame.create({
                    data: {
                        nomeImagem: file.filename,
                        nomeExame: titulo,
                        idUsuario: id,
                        dataCriacao: dataEHoraBrasil
                    }
                });

                if (adicionarExame) {
                    return res.status(201).json({ message: 'Exame criado com sucesso!', adicionarExame });
                }

            } catch (error) {
                return res.status(400).json({ error });
            }
        }
    }

    async listarExames(req: Request, res: Response) {
        const idUsuario = Number(req.params.id);

        const listarExames = await prisma.exame.findMany({
            select: {
                idExame: true,
                nomeExame: true,
                nomeImagem: true,
                dataCriacao: true,
            },
            where: {
                idUsuario
            }
        });

        if (listarExames) {
            return res.json({ listarExames });
        } else {
            return res.json({ message: 'Esse usuário ainda não possuí nenhum exame!' });
        }
    }

    async deletarExame(req: Request, res: Response) {
        const id = Number(req.params.id);

        const { filename } = req.body;

        const deleteImagesServices = new DeleteImagesService();

        await deleteImagesServices.execute(filename);

        try {
            const deletarExame = await prisma.exame.delete({
                where: {
                    idExame: id
                }
            });

            if (deletarExame) {
                return res.status(200).json({ message: 'Exame deletado com sucesso!' });
            }
        } catch (error) {
            return res.status(400).json({ error });
        }


    }



}