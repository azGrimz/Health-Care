import { Link } from "react-router-dom"
import img404  from "../../img/img404/erro404TCC.png"
import './styles.css'
import { useEffect, useState } from "react";


const NotFoundPage = () => {
  const [rota, setRota] = useState("");
  useEffect(() => {
    if(localStorage.getItem("token") && localStorage.getItem("Empresa")) {
      setRota("especialidadeDisponivel");
    } else if(localStorage.getItem("token") && localStorage.getItem("admin")) {
      setRota("/admEmpresa");
    } else {
      setRota("/");
    }
  })
  return (
    <div className="div-total">
      <div className="div-conteudo">
        <aside className="aside-esquerdo">
          <h1 className="titulo-404">Oops! Não <p>encontramos essa página.</p></h1>
          <p className="paragrafo-404">acho que você escolheu a porta errada, porque não consegui encontrar a pagina que está procurando.</p>
          <Link className="link-inicio" to={rota}><button className="vontar-inicio"> Voltar ao Inicio &gt; </button></Link>
        </aside>
        <aside className="aside-direito">
          <img className="imagem404" src={img404} alt="" />
        </aside>
      </div>
    </div>
  )
}

export default NotFoundPage