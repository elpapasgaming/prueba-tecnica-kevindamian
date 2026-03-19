import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getPosts } from "../api/posts";

function Lista() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const autenticado = localStorage.getItem("autenticado");

        if (!autenticado){
            navigate ("/");
        }

        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                console.log("Posts recibidos:", data);
                setPosts(data);
            } catch (error) {
                console.error("Error al obtener posts", error);
            }
        };
        fetchPosts();
    }, [navigate]);

    return (
        <div>
            <h2>Listado</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/registro/${post.id}`}>{post.title}</Link>
                    </li>))}
            </ul>

        </div>
    )

}

export default Lista;