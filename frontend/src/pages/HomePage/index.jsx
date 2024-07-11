import Image from '../../img/imgLogo/logo.png';
import ImagePlus from '../../img/imagemFundo/Plus-Math.png'
import ImagePlusBranco from '../../img/imagemFundo/Plus-Math-branco.png'
import './styles.css'
import { Link } from 'react-router-dom';

export function HomePage() {
    return(
        <body className="tela-total-homepage">
            <header className='header-homepage'>
                <div className="parte-esquerda-header-homepage">
                    <img className="imagem-logo-header" src={Image} alt="" />
                </div>
                <div className="parte-direita-header-homepage">
                    <Link to={'/registrarDados'}><button className="botao-registrar-homepage"> Registre-se </button></Link>
                    <Link to={'/entrar'}><button className="botao-entrar-homepage"> Entrar </button></Link>
                </div>
            </header>
            <main className="main-homepage">
                <div className='parte-direita-main-homepage'>
                <img className="icone-plus" src={ImagePlus} alt="" />
                    <div className="div-centralizadora-healthcare-homepagee">
                        <div className="healthcare-homepage">
                            <p className="health-logo-homepage">HEALTH</p>
                            <p className="care-logo-homepage" >CARE</p> 
                        </div>    
                        <div>
                            <p className="medical-logo-homepage">MEDICAL</p>
                        </div>
                    </div>
                    <img className="icone-plus-branco" src={ImagePlusBranco} alt="" />
                </div>
                <div className='parte-esquerda-main-homepage'>
                <img className="icone-plus" src={ImagePlus} alt="" />
                    <div className="div-descricao-homepage">
                        <div className="div-centralizadora-healthcare-homepagee-responsivo">
                            <div className="healthcare-homepage">
                                <p className="health-logo-homepage">HEALTH</p>
                                <p className="care-logo-homepage" >CARE
                                <strong className="medical-logo-homepage-responsivo">MEDICAL</strong> 
                                </p>
                            </div>    
                        </div>
                        <p className="titulo-descricao-homepage">Tudo para seus pacientes </p>
                        <p className="descricao-homepage">Divulge adicionando as especialidades disponiveis do seu hospital ou clinica e tenha mais pacientes.</p> 
                    </div>
                    <img className="icone-plus-branco2" src={ImagePlusBranco} alt="" />
                </div>
            </main>
        </body>
    )
}