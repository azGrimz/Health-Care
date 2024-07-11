import { createContext, useState } from "react"

export const ContextNome = createContext()

export const ContextProvider = ({children}) => {
    const [nomeEmpresa, setNomeEmpresa] = useState();

    return(
        <ContextNome.Provider value={{nomeEmpresa, setNomeEmpresa}}>
            {children}
        </ContextNome.Provider>
    )
}
