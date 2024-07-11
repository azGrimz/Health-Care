
import { LogOut } from "lucide-react";
import  Image from "../../img/imgLogo/logoHealthCareGrande.png";
import  Image2 from "../../img/imgLogo/logoHealthCarePequeno.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import blogFetch from "@/axios/config";

export function NavbarAdm(){
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [usuario, setUsuario] = useState([]);

    const navigate = useNavigate();

    const selecionarUsuario = async(id) => {
        try {
            const response = await blogFetch.get(`/selecionarUsuario/${id}`);
            const data = response.data;
            setUsuario(data.selecionarUsuario.nomeUsuario);
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        localStorage.clear();
        navigate('/entrarAdmin');
    }

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 500);
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    useEffect(() => {
        const admin = localStorage.getItem('admin');
        selecionarUsuario(admin);
    }, []);

    return(
        <>
            <header>
                <div className="parte-esquerda-logo">
                    <img className="imagem-logo" src={isSmallScreen ? Image2 : Image} alt="" />
                </div>
                <div className="parte-direita-logo-adm">
                    <p>{usuario}</p>
                    <Link className='link1' to={'/admEmpresa'}>Empresas</Link>
                    <Link className='link2' to={'/admPaciente'}>Pacientes</Link>
                    <p className='logout' onClick={logout}><LogOut color='red' size={22} strokeWidth={2.7}/></p>
                </div>
            </header>
        </>
    )
}