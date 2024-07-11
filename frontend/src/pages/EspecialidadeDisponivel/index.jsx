import { useEffect, useState } from "react";
import './styles.css';
import Navbar from "../../components/Navbar";
import blogFetch from "../../axios/config";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import fotoDeletar from "../../img/imagemFundo/fotoDeletar.png";
import fotoEditar from "../../img/imagemFundo/fotoEditar.png";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EditarQuantidade } from "@/components/editarQuantidade/editarQuantidade";


export function EspecialidadeDisponivel() {

    const navigate = useNavigate();

    const [especialidades, setEspecialidades] = useState([]);
    const [especialidadesDisponiveis, setEspecialidadesDisponiveis] = useState([]);
    const [especialidade, setEspecialidade] = useState();
    const [quantidade, setQuantidade] = useState(0);
    const [status, setStatus] = useState(true);

    const empresa = localStorage.getItem("Empresa");
    const token = localStorage.getItem("token");

    

    const listarEspecialidades = async () => {
        const response = await blogFetch.get('/listarEspecialidades');
        const data = response.data;

        setEspecialidades(data.listarEspecialidades);
    }

    const listarEspecialidadesDisponiveis = async () => {
        const response = await blogFetch.get(`/listarEspecialidades/${empresa}`);
        const data = response.data;

        setEspecialidadesDisponiveis(data.listarEspecialidadesEmpresas);
    }

    const adicionarEspecialidade = async (e) => {
        e.preventDefault();
        try {
            await blogFetch.post(`/adicionarEspecialidade/${empresa}/${especialidade}`, {
                quantidade: quantidade
            });

            setEspecialidade('');
            setQuantidade(0);
        } catch (e) {
            Swal.fire({
                icon: 'error',
                text: 'Erro ao adicionar!'
            });
        }

        listarEspecialidadesDisponiveis();

    }

    const selecionarEmpresa = async () => {
        const response = await blogFetch.get(`/selecionarEmpresa/${empresa}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        const data = response.data;
        setStatus(data.selecionarEmpresa.statusEmpresa);

    }

    const alterarStatus = async () => {

        await blogFetch.put(`/atualizarStatus/${empresa}`, {
            status: !status
        });

        setStatus(!status);

    }

    const deletarEspecialidade = async (id) => {
        await blogFetch.delete(`/deletarEspecialidade/${id}`);
        setEspecialidadesDisponiveis(especialidadesDisponiveis.filter(especialidade => especialidade.idDisponibilidade !== id));
    }

    const idQuantidadeAlterar = (data) => {
        const idAlterado = especialidadesDisponiveis.findIndex((arrayCompleta) => {
            return arrayCompleta.idDisponibilidade === data.idDisponibilidade
        })

        const especialidadesAtualizadas = [...especialidadesDisponiveis]

        especialidadesAtualizadas[idAlterado].quantidadeEspecialidade = data.quantidade

        setEspecialidadesDisponiveis(especialidadesAtualizadas)
    }

    useEffect(() => {
        if (localStorage.length == 0) {
            navigate('/entrar');
        } else {
            listarEspecialidades();
            listarEspecialidadesDisponiveis();
            selecionarEmpresa();
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="container-total-especialidade-disponivel">
                <div className="responsivo-disponivell">
                    <form className="form-especialidades" onSubmit={adicionarEspecialidade}>
                        <h1 className="titulo-adicionar-especialidade-disponivel">Adicionar Especialidade</h1>
                        <div className="inputs-form-especialidades">
                        
                            <select className='escolha-especialidade-disponivel' value={especialidade} onChange={(e) => setEspecialidade(Number(e.target.value))}>
                                <option>Especialidade</option>
                                {especialidades.map(especialidade => (
                                    <option key={especialidade.idEspecialidade} value={especialidade.idEspecialidade}>
                                        {especialidade.nomeEspecialidade}
                                    </option>
                                ))}
                            </select>
                            <input className="input-quantidade-disponivel" type="number" placeholder="0" onChange={(e) => setQuantidade(Number(e.target.value))} />
                            <button type="submit" className="botao-especialidade-disponivel">Adicionar</button>
                        </div>
                    </form>
                    <div className="tabela-adicionar-especialidade-disponivel">
                    <table className="styled-table-disponivel">
                        <thead className="thead-table">
                            <th>Especialidade</th>
                            <th>Disponiveis</th>
                            <th>Ações</th>
                            <th>
                            <label className="switch">
                                <input type="checkbox" checked={status} onChange={alterarStatus}/>
                                <span className="slider" ></span>
                            </label>
                            </th>
                        </thead>
                        <tbody>
                            {especialidadesDisponiveis.map(especialidadeEmpresa => (
                                <tr key={especialidadeEmpresa.idDisponibilidade}>
                                    <td>{especialidadeEmpresa.Especialidade.nomeEspecialidade}</td>
                                    <td>{especialidadeEmpresa.quantidadeEspecialidade}</td>
                                    <td className="td-botoes">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button type="button" className="botao-editar-disponivel"><img className="img-foto" src={fotoEditar}></img></button>
                                            </DialogTrigger>
                                            <EditarQuantidade idQuantidadeAlterar={idQuantidadeAlterar} idDisponibilidade={especialidadeEmpresa.idDisponibilidade}/>
                                        </Dialog>
                                        <button className="botao-deletar-disponivel" onClick={() => deletarEspecialidade(especialidadeEmpresa.idDisponibilidade)}><img className="img-foto" src={fotoDeletar}></img></button>
                                    </td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

