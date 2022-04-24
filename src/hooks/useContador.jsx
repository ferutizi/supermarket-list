import { useState } from "react";

const useContador = () => {
    const [contador, setContador] = useState(0)

    const aumentar = () => {
        setContador(contador + 1)
    }
    
    const disminuir = () => {
        setContador(contador - 1)
    }

    return(    
        [contador, aumentar, disminuir]
    )
}

export default useContador