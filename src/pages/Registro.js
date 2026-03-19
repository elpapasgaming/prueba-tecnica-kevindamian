import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../api/posts";

function Registro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const autenticado = localStorage.getItem("autenticado");

    if (!autenticado){
        navigate ("/");
    }

    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Error al obtener el registro", error);
      }
    };

    fetchPost();
  }, [id, navigate]);

  if (!post) {
    return <p>Cargando registro...</p>;
  }

  return (
    <div>
      <h2>Detalle del registro</h2>

      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
}

export default Registro;