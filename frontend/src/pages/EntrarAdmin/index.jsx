import './styles.css';
import { LogoDescricao } from '../../components/LogoDescricao';
import { Button } from '../../components/Button'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2'
import blogFetch from '../../axios/config';

export function EntrarAdmin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const autenticarAdmin = async (e) => {
        e.preventDefault();
        try {

            const response = await blogFetch.post('/autenticarAdmin', {
                email, senha
            });

            const data = response.data;

            localStorage.setItem("token", data.token);
            localStorage.setItem("admin", data.Usuario.idUsuario);

            Swal.fire({
                icon: 'success',
                text: data.message
            });

            navigate('/admEmpresa');


        } catch (error) {
            if (error.response.status === 404) {
                Swal.fire({
                    icon: 'error',
                    text: 'Erro ao autenticar! Email ou Senha inválidos!'
                });
            } else if (error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    text: 'Erro ao autenticar! Você não possui autorização!'
                });
            }
        }
    }

    return (
        <div className='container-total-admin'>
            <div className='parte-esquerda-entrar-admin'>
                <div className="div-centralizadora-healthcare-homepagee">
                    <div className="healthcare-homepage">
                        <p className="health-logo-homepage">HEALTH</p>
                        <p className="care-logo-homepage" >CARE</p>
                    </div>
                    <div>
                        <p className="medical-logo-homepage">MEDICAL</p>
                    </div>
                </div>
            </div>
            <div className='parte-direita-entrar-admin'>
                <div className='responsivo-admin'>
                    <LogoDescricao title="Bem vindo novamente" />
                    <form className='formulario-entrar-admin' onSubmit={autenticarAdmin}>
                        <input onChange={(e) => setEmail(e.target.value)} className="input-adm" type="text" name="Email" placeholder="Email" />
                        <input onChange={(e) => setSenha(e.target.value)} className="input-adm" type="password" name="senha" placeholder="Senha" />
                        <Button className="button-adm" type="submit" content="Entrar" name="entrar" />
                    </form>
                </div>
            </div>
        </div>

    );
}