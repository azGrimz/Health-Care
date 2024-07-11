import blogFetch from "@/axios/config";
import Navbar from "@/components/Navbar";
import { useContext, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import './style.css'
import { ContextNome } from "@/components/Context/ContextName";
import randomColor from "randomcolor";
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { UserRound } from 'lucide-react';

export function Comentarios() {
    
    const empresa = localStorage.getItem("Empresa");
    const {nomeEmpresa} = useContext(ContextNome);
    
    const [comentarios, setComentarios] = useState([]);

    //
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
          color: '#ff3d47',
        },
      });

    //
    const listarComentarios = async () => {
        const response = await blogFetch.get(`/listarComentarios/${empresa}`);
        const data = response.data;
        setComentarios(data);
    }

    useEffect(() => {
        listarComentarios();
    }, []);
    
    return (
        <body className="body-adm">
            <Navbar />
            <main className="container-total-adm">

                <div className="responsivo-disponivell">
                    <h1 className="titulo-adicionar-especialidade-disponivel-adm">
                        Comentários
                    </h1>
                    <div className="totalComentarios">
                        <hr />
                        <div className="dadosEmpresa">
                        
                            <div className="imagemComentario" style={{backgroundColor: 'blue'}}>{nomeEmpresa?.charAt(0).toUpperCase()}</div>
                            <div>   
                                <p className="nomeEmpresa">{nomeEmpresa}</p>
                                <p className="quantidadeComentarios">comentários ({comentarios.length})</p>
                            </div>
                        </div>
                        <hr />
                        <ScrollArea className="h-[350px] mt-8 rounded-md">
                            {comentarios.map((todosComentarios) => (
                                <div key={todosComentarios.Usuario.idUsuario} className="">
                                    <div className="containerUsuarioWeb">
                                        <div className="imagemComentario" style={{backgroundColor: randomColor()}}>{todosComentarios.Usuario.nomeUsuario.charAt(0).toUpperCase()}</div>
                                        <div className="nomeData">
                                            <p>{todosComentarios.Usuario.nomeUsuario}</p>
                                            <p className="dataComentario">{todosComentarios.dataPublicacao.slice(0,10)}</p>
                                        </div>
                                    </div>
                                    <div className="comentariosWeb">
                                        <p>
                                            <strong>Situação da fila :</strong>
                                            <StyledRating 
                                                defaultValue={todosComentarios.situacaoFila}
                                                readOnly
                                                size="small"
                                                icon={<UserRound fontSize="small" />}
                                                emptyIcon={<UserRound fontSize="small" />}/>
                                        </p>
                                        <p>{todosComentarios.conteudoComentario}</p>
                                        <p className="horarioEnviado">Enviado: {todosComentarios.dataPublicacao.slice(11,20)}</p>
                                        
                                    </div>
                                </div>
                            )
                            )}
                        </ScrollArea>
                    </div>
                </div>
            </main>
        </body>
    )
}

