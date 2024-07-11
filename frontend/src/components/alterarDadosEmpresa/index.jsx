import blogFetch from '@/axios/config'
import { Button } from '../ui/button'
import {DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ContextNome } from '../Context/ContextName'

export function DialogAlterarDadosEmpresa({fechouDialog}){

  const {nomeEmpresa, setNomeEmpresa} = useContext(ContextNome);

  const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const idEmpresa = localStorage.getItem("Empresa");

    const [nomePlaceholder, setNomePlaceholder] = useState("");
    const [emailPlaceholder, setEmailPlaceholder] = useState("");
    const [telefonePlaceholder, setTelefonePlaceholder] = useState();

    const selecionarEmpresa = async () => {
        const response = await blogFetch.get(`/selecionarEmpresa/${idEmpresa}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = response.data.selecionarEmpresa;

        setNomePlaceholder(data.nomeEmpresa);
        setEmailPlaceholder(data.emailEmpresa);
        setTelefonePlaceholder(data.telefoneEmpresa);
    }

    const atualizarEmpresa = async (e) => {
        e.preventDefault();

        try {

            const response = await blogFetch.put(`/atualizarEmpresa/${idEmpresa}`, {
                nome: nomePlaceholder,
                email: emailPlaceholder,
                telefone: telefonePlaceholder,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = response.data;

            Swal.fire({
              icon: 'success',
              text: data.message
            });
            

        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Erro ao atualizar!'
            })
        }
    }

    const deletarEmpresa = async () => {
      try {
        await Swal.fire({
          title: 'Tem certeza que deseja apagar perfil da empresa?',
          text: "Perfis apagados não podem ser recuperados!",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Deletar'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await blogFetch.delete(`/deletarEmpresa/${idEmpresa}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data;
                Swal.fire(data.message, '', 'success');
                localStorage.clear();
                navigate('/entrar');
            }
          })
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        if (localStorage.length == 0) {
            navigate('/entrar');
        } else {
            selecionarEmpresa();
        }
    }, []);

    return(
        <DialogContent className="text-slate-600">
          <DialogHeader>
            <DialogTitle>Perfil da Empresa</DialogTitle>
            <DialogDescription>
              Atualize as informações do seu estabelecimento visíveis aos seus clientes
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={atualizarEmpresa}>
            <div className='space-y-2 py-3'>
              <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-right' htmlFor='nameFantasia'>Nome Fantasia</Label>
                  <Input 
                        onChange={(e) => setNomePlaceholder(e.target.value)} 
                        defaultValue={nomePlaceholder} 
                        className='col-span-2 border-2 border-solid border-[rgba(184,185,190,1)]' id='nameFantasia'
                  />
              </div>
            
              <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-right' htmlFor='email'>E-mail</Label>
                  <Input 
                      onChange={(e) => setEmailPlaceholder(e.target.value)} 
                      defaultValue={emailPlaceholder}
                      className='col-span-2 border-2 border-solid border-[rgba(184,185,190,1)]' id='email'
                  />
              </div>

              <div className='grid grid-cols-4 items-center gap-2'>
                <Label className='text-right' htmlFor='telefone'>Telefone</Label>
                <Input 
                    onChange={(e) => setTelefonePlaceholder((e.target.value))} 
                    defaultValue={telefonePlaceholder}
                    className='col-span-2 border-2 border-solid border-[rgba(184,185,190,1)]' id='telefone'
                />
              </div>
            </div>

            <DialogFooter>
                <DialogClose>
                <Button
                  type='button'
                  onClick={() => {deletarEmpresa(); setTimeout(() => {fechouDialog(false)}, "300");}}
                  className="bg-red-600 max-w-[170px] hover:bg-[#ff3535]">
                  Deletar empresa
                </Button>
                </DialogClose>
                <DialogDescription>
                  <DialogClose asChild>
                    <Button
                      className="border-2 border-solid border-[rgba(184,185,190,1)] bg-white color text-black hover:border hover:bg-transparent hover:border-solid hover:border-[black]">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <DialogClose>
                    <Button
                      onClick={() => {fechouDialog(false); setNomeEmpresa(nomePlaceholder)}}
                      type='submit'
                      className="bg-emerald-500 ml-2 hover:bg-[#06e84a]">
                        Salvar
                    </Button>
                  </DialogClose>
                </DialogDescription>
            </DialogFooter>
          </form>
        </DialogContent>
    )
}
