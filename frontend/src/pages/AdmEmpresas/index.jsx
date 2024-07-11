import './styles.css';
import { useNavigate } from 'react-router-dom';
import fotoDeletar from "../../img/imagemFundo/fotoDeletar.png"
import { useEffect, useState } from 'react';
import blogFetch from '../../axios/config';
import { NavbarAdm } from '@/components/NavbarAdm';

export function AdmEmpresa() {

    const navigate = useNavigate();

    const [empresas, setEmpresas] = useState([]);

    const listarEmpresas = async () => {
        try {
            const response = await blogFetch.get('/listarEmpresas');
            const data = response.data;
            setEmpresas(data.listarEmpresas);

        } catch (error) {
            console.log(error);
        }
    }


    const deletarEmpresa = async (id) => {
        try {
            await blogFetch.delete(`/deletarEmpresa/${id}`);
            setEmpresas(empresas.filter(empresa => empresa.idEmpresa !== id));
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
            listarEmpresas();
        }
    }, []);

    return (
        <body className="body-adm">
            <NavbarAdm/>
            <main className="container-total-adm">
                <div className="responsivo-disponivell">
                    <h1 className="titulo-adicionar-especialidade-disponivel-adm">
                        Empresas Cadastradas
                    </h1>
                    <div className="tabela-adicionar-especialidade-disponivel-adm">
                        <table className="styled-table-adm">
                            <thead className="thead-adm">
                                <tr>
                                    <th>ID</th>
                                    <th>Empresa</th>
                                    <th>Email</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empresas.map((empresa) => (
                                        <tr key={empresa.idEmpresa}>
                                            <td>{empresa.idEmpresa}</td>
                                            <td>{empresa.nomeEmpresa}</td>
                                            <td>{empresa.emailEmpresa}</td>
                                            <td className="td-botoes">
                                                <button className="botao-deletar-disponivel" onClick={() => deletarEmpresa(empresa.idEmpresa)} ><img className="img-foto" src={fotoDeletar}></img></button>
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

