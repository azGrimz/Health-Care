import { Button } from "../ui/button";
import './styles.css';
import { Building, ChevronDown,UserRoundCogIcon,LogOut} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '../ui/dropdown-menu'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { DialogAlterarDadosEmpresa } from "../alterarDadosEmpresa";
import { DialogAlterarContaEmpresa } from "../alterarContaEmpresa";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import blogFetch from "@/axios/config";
import { ContextNome } from "../Context/ContextName";

export function MenuConta(){

    const navigate = useNavigate();

    const {nomeEmpresa, setNomeEmpresa} = useContext(ContextNome);
    const token = localStorage.getItem("token");
    const idEmpresa = localStorage.getItem("Empresa");
    const [open, setOpen] = useState(false)
    
    const fechouDialog = (data) => {
        setOpen(data);
    }

    const selecionarEmpresa = async () => {
        const response = await blogFetch.get(`/selecionarEmpresa/${idEmpresa}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = response.data.selecionarEmpresa;

        setNomeEmpresa(data.nomeEmpresa);
    }
    
    const logout = () => {
        localStorage.clear();
        navigate('/entrar');
    }
    
    
    useEffect(() => {
        selecionarEmpresa();
    }, []);
    
    return(
        
            <DropdownMenu open={open} onOpenChange={setOpen}>

                <DropdownMenuTrigger asChild>
                    <Button  className="flex gap-[2] select-none hover:bg-transparent items-center bg-transparent text-[black] text-[15px] px-[5px] py-0 rounded-lg border-2 border-solid border-[rgba(232,232,232,1)] ">
                        <strong>{nomeEmpresa}</strong>
                        <ChevronDown className="chevronDown"/>
                    </Button>
                </DropdownMenuTrigger>
                    
                <DropdownMenuContent 
                    align="end" className="dropdownMenuContent" >
                    <Dialog>  
                        <DialogTrigger asChild>
                            <DropdownMenuItem className="menuItem" onSelect={(e) => e.preventDefault()}>
                                <Building size={20}/>
                                <span>Perfil empresa</span>
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogAlterarDadosEmpresa fechouDialog={() => {fechouDialog()}} />
                    </Dialog>

                    <DropdownMenuSeparator />
                    <Dialog>
                        <DialogTrigger asChild>
                            <DropdownMenuItem className="menuItem" onSelect={(e) => e.preventDefault()}>
                                <UserRoundCogIcon size={20}/>
                                <span>Configurações</span>
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogAlterarContaEmpresa fechouDialog={() => {fechouDialog()}}/>
                    </Dialog>

                    <DropdownMenuSeparator />
                <DropdownMenuItem  asChild >
                    <button className="menuItemSair" onClick={logout}>
                        <LogOut color='red' size={20}/>
                        <span>Sair</span>
                    </button>
                    
                </DropdownMenuItem>
        
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
