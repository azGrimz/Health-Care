import { Router } from "express";
import { EmpresaController } from "./controllers/EmpresaController";
import { AuthMiddleware } from "./middlewares/auth";
import { UsuarioController } from "./controllers/UsuarioController";
import { EspecialidadeController } from "./controllers/EspecialidadeController";
import multer from 'multer';
import multerConfig from "./utils/multerConfig";

const empresaController = new EmpresaController();
const usuarioController = new UsuarioController();
const especialidadeController = new EspecialidadeController();

const upload = multer(multerConfig);

export const router = Router();


// ROTAS DE EMPRESA
router.post('/adicionarEmpresa', empresaController.adicionarEmpresa);
router.get('/listarEmpresas', empresaController.listarEmpresas);
router.get('/selecionarEmpresa/:id', empresaController.selecionarEmpresa);
router.post('/autenticarEmpresa', empresaController.autenticarEmpresa);
router.put('/atualizarEmpresa/:id',AuthMiddleware, empresaController.atualizarEmpresa);
router.delete('/deletarEmpresa/:id', empresaController.deletarEmpresa);
router.put('/atualizarStatus/:id', empresaController.atualizarStatus);
router.post('/pesquisarEmpresa', AuthMiddleware, empresaController.pesquisarEmpresa);
router.get('/listarEmpresasAbertas', empresaController.listarEmpresasAbertas);
router.get('/listarProfissionais/:id', empresaController.listarProfissionaisDisponiveis);
router.get('/listarComentarios/:id', empresaController.listarComentarios);
router.put('/atualizarSenha/:id', empresaController.atualizarSenha);

// ROTAS DE USUARIO
router.get('/listarUsuarios', usuarioController.listarUsuarios);
router.post('/adicionarUsuario', usuarioController.adicionarUsuario);
router.post('/autenticarUsuario', usuarioController.autenticarUsuario);
router.put('/atualizarUsuario/:id', usuarioController.atualizarUsuario);
router.delete('/deletarUsuario/:id', usuarioController.deletarUsuario);
router.get('/selecionarUsuario/:id', usuarioController.selecionarUsuario);
router.post('/autenticarAdmin', usuarioController.autenticarAdmin);
router.post('/realizarComentario', usuarioController.realizarComentario);
router.post('/adicionarExame', upload.single('image'), usuarioController.adicionarExame);
router.get('/listarExames/:id', usuarioController.listarExames);
router.delete('/deletarExame/:id', usuarioController.deletarExame);

// ROTAS DE ESPECIALIDADES 
router.get('/listarEspecialidades', especialidadeController.listarEspecialidades);
router.get('/listarEspecialidades/:idEmpresa', especialidadeController.listarEspecialidadesEmpresas);
router.post('/adicionarEspecialidade/:idEmpresa/:idEspecialidade', especialidadeController.adicionarEspecialidade);
router.put('/informarEspecialidade/:idDisponibilidade', especialidadeController.informarDisponibilidade);
router.delete('/deletarEspecialidade/:idDisponibilidade', especialidadeController.deletarEspecialidade);
router.get('/selecionarDisponibilidade/:idDisponibilidade', especialidadeController.selecionarDisponibilidade);