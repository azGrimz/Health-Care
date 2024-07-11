import './styles.css';
import Image from '../../img/imgLogo/logo.png';
import { Link } from 'react-router-dom';


export function LogoDescricao(props){
    return(
        <div className='parte-superior'>
            <Link to={'/entrar'}>
            <img className='logo' src={Image} alt="" />
            </Link>
            <h2 className='titulo'>{props.title}</h2>
            <p style={{width: props.size}} className='descricao-logo'>{props.description}</p>
        </div>
    );
};