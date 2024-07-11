import { useState } from 'react';
import './styles.css';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button'
import { Links } from '../../components/linksBaixoBotao';
import { LogoDescricao } from '../../components/LogoDescricao';

export function RecuperarSenha(){

    return(
        <div className='container-total'>
           
            <div className='parte-esquerda'>
                <div className='responsividade'>
                    <LogoDescricao 
                        size="450px"
                        title="Recupere sua senha" 
                        description="Para recuperar a sua senha, informe seu endereço de email 
                        que nós enviaremos um link para a alteração da senha."/>
                    <form action="" className='formulario-recuperar-senha'>
                    <Input type="email" text="E-mail" name="e-mail" placeholder="E-mail"/>
                    
                    <Button type="submit" content="RECUPERAR" name="cadastrar"/>
                    <Links content="Lembrou a senha? " text=" Entrar" link="/entrar"/>
                        
                    </form>
                </div>
            </div>
            <div className='parte-direita'>
                            
            </div>

        </div>
    );
};
