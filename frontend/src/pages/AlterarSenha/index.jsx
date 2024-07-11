import { useEffect, useState } from 'react';
import './styles.css';
import { Button } from '../../components/Button'
import { Links } from '../../components/linksBaixoBotao';
import { LogoDescricao } from '../../components/LogoDescricao';
import blogFetch from '../../axios/config';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';

export function AlterarSenha() {

    const navigate = useNavigate();

    const [senhaAntiga, setSenhaAntiga] = useState("");
    const [senhaNova, setSenhaNova] = useState("");
    const [confimarSenhaNova, setConfirmarSenhaNova] = useState("");

    const { id } = useParams();

    const atualizarSenha = async (e) => {
        e.preventDefault();

        try {

            if(senhaNova != confimarSenhaNova) {
                Swal.fire({
                    icon: 'error',
                    text: 'Erro! As duas senhas não conferem!'
                });

                return
            } else {

                const response = await blogFetch.put(`/atualizarSenha/${id}`, {
                    senhaAntiga: senhaAntiga,
                    senhaNova: senhaNova
                });

                const data = response.data;

                Swal.fire({
                    icon: 'success',
                    text: data.message
                  });

                  navigate('/especialidadeDisponivel');
            }


        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Erro ao alterar senha!'
            });
            console.log(error);
        }
    }


    useEffect(() => {
        if (localStorage.length == 0) {
            navigate('/entrar');
        } 
    }, []);



    return (
        <>
            <div className='container-total'>

                <div className='parte-esquerda'>
                    <LogoDescricao title="Atualizar Senha" description="" />
                    <form onSubmit={atualizarSenha} className='formulario'>
                        <label htmlFor="nome fantasia">Senha Antiga</label>
                        <input type="password" onChange={(e) => setSenhaAntiga(e.target.value)} placeholder='Digite a senha antiga...' />
                        <label htmlFor="e-mail">Senha nova</label>
                        <input type="password" onChange={(e) => setSenhaNova(e.target.value)} placeholder="Digite a nova senha..." />
                        <label htmlFor="telefone">Confirmar senha</label>
                        <input type="password" onChange={(e) => setConfirmarSenhaNova(e.target.value)} placeholder="Confimar nova senha..." />
                        <Button type="submit" content="ALTERAR SENHA" name="Editar" />

                    </form>
                    <Links content="Deseja continuar com a senha atual? " text=" voltar" link="/alterarDados" />
                </div>
                <div className='parte-direita'>
                </div>
            </div>
        </>
    );
}
