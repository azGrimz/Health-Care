import {Routes , Route, BrowserRouter } from "react-router-dom";

import { Entrar } from "../pages/Entrar";
import { RegistrarDados } from "../pages/RegistrarDados"
import { RecuperarSenha } from "../pages/RecuperarSenha"
import { EspecialidadeDisponivel } from "../pages/EspecialidadeDisponivel"
import { HomePage } from "../pages/HomePage";
import { EntrarAdmin } from "../pages/EntrarAdmin";
import { AdmEmpresa } from "../pages/AdmEmpresas";
import { AdmPaciente } from "../pages/AdmPacientes";
import { AlterarSenha } from "../pages/AlterarSenha";
import NotFoundPage from "../pages/NotFoundPage";
import { Comentarios } from "@/pages/Comentarios";

export const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<HomePage/>} path="/"/>
                <Route element={<Entrar/>} path="/entrar"/>
                <Route element={<RegistrarDados/>} path="registrarDados"/>
                <Route element={<RecuperarSenha/>} path="recuperarSenha"/>
                <Route element={<EspecialidadeDisponivel/>} path="especialidadeDisponivel"/>
                <Route element={<EntrarAdmin/>} path="entrarAdmin"/>
                <Route element={<AdmEmpresa/>} path="admEmpresa"/>
                <Route element={<AdmPaciente/>} path="admPaciente"/>
                <Route element={<Comentarios/>} path="/comentarios"/>
                <Route element={<AlterarSenha/>} path="alterarSenha/:id"/>
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </BrowserRouter>
    )
}
