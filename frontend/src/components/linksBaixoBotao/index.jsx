import { Link } from 'react-router-dom';
import './styles.css'

export function Links(props){
    return(
        <>
        <p className='conteudo'>{props.content}<Link className='link' to={props.link}>{props.text}</Link></p>
        </>
    );
};