import  Image from "../../img/imgLogo/logoHealthCareGrande.png";
import  Image2 from "../../img/imgLogo/logoHealthCarePequeno.png";
import { Link} from 'react-router-dom';
import './styles.css'
import { MenuConta } from '../menuConta/account-menu';
import { useEffect, useState } from "react";
import { HeartPulse, BarChartBig } from 'lucide-react';

const Navbar = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

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
    return (
        <>
         <header>
                <div className="parte-esquerda-logo">
                    <img className="imagem-logo" src={isSmallScreen ? Image2 : Image} alt="" />
                </div>
                <div className="parte-direita-logo">
                <Link className='link' to={'/especialidadeDisponivel'}><HeartPulse className="hover:border-solid hover:text-[red]"/></Link>
                <Link className='link' to={'/comentarios'}><BarChartBig className="hover:border-solid hover:text-[red]"/></Link>
                <MenuConta/>
                </div>
            </header>
        </>
    )
}

export default Navbar
