import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Inicio () {
    
    const navigate = useNavigate();

    useEffect (() => {
        const autenticado = localStorage.getItem("autenticado");
        if (!autenticado){
            navigate ("/");
        }
    }, [navigate]);

    return <h2>Inicio</h2>

}

export default Inicio;