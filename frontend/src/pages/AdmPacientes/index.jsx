import './styles.css';
import Imagem from "../../img/imgLogo/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import fotoDeletar from "../../img/imagemFundo/fotoDeletar.png"
import { useEffect, useState } from 'react';
import blogFetch from '../../axios/config';
import { NavbarAdm } from '@/components/NavbarAdm';

export function AdmPaciente() {

    const admin = localStorage.getItem('admin');

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");
    const [usuarios, setUsuarios] = useState([]);

    const listarUsuarios = async () => {
        try {
            const response = await blogFetch.get('/listarUsuarios');
            const data = response.data;
            setUsuarios(data.listarUsuarios);
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        localStorage.clear();
        navigate('/entrarAdmin');
    }

    const selecionarUsuario = async(id) => {
        try {
            const response = await blogFetch.get(`/selecionarUsuario/${id}`);
            const data = response.data;
            setUsuario(data.selecionarUsuario.nomeUsuario);
        } catch (error) {
            console.log(error);
        }
    }

    const deletarUsuario = async (id) => {
        try {
            await blogFetch.delete(`/deletarUsuario/${id}`);
            setUsuarios(usuarios.filter(usuario => usuario.idUsuario !== id));
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        const admin = localStorage.getItem('admin');
        if (localStorage.length == 0) {
            navigate('/entrar');
        } else if(!admin){
            navigate('/especialidadeDisponivel');
        } else {
            listarUsuarios();
            selecionarUsuario(admin);
        }
    }, []);


    return (
        <body className="body-adm">
            <NavbarAdm/>
            <main className="container-total-adm">
                <div className="responsivo-disponivell">
                    <h1 className="titulo-adicionar-especialidade-disponivel-adm">
                        Pacientes cadastrados 
                    </h1>
                    <div className="tabela-adicionar-especialidade-disponivel-adm">
                        <table className="styled-table-adm">
                            <thead className="thead-adm">
                                <tr>
                                    <th>ID</th>
                                    <th>Paciente</th>
                                    <th>Email</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario) => (
                                        <tr key={usuario.idUsuario}>
                                            <td>{usuario.idUsuario}</td>
                                            <td>{usuario.nomeUsuario}</td>
                                            <td>{usuario.emailUsuario}</td>
                                            <td className="td-botoes">
                                                <button className="botao-deletar-disponivel" onClick={() => deletarUsuario(usuario.idUsuario)} ><img className="img-foto" src={fotoDeletar}></img></button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </body>
    );
}