//Acá voy a usar el HOOK UseLoaderData para traerme lo que devuelva la llamada de los post del blog y lo voy a usar para determinar que ese resultado va a ser el array que consumo

import { Link, useLoaderData } from "react-router-dom";

import Post from "./Post";

const Blog = () => {
  {
    /*Entre comillas le tengo que pasar si o si el mismo nombre del objeto que exporté en la funcion ASYNC de consulta a la API*/
  }
  const { datosTraidos } = useLoaderData();


  return (
    <>
      <h1>Blog</h1>
      <div>
        <ul className="list-group">
          {datosTraidos.length > 0 

          ? (datosTraidos.map((dato) => (
              <li key={dato.id} className="list-group-item">
                <Link to={`/blog/${dato.id}`}>
                  {dato.id} {dato.title}
                </Link>
              </li>
            ))
          ) 
          
          : (<li>datos no encontrados</li>)}
        </ul>
      </div>
    </>
  );
};

export default Blog;

//voy a crear una funcion asincrona para consumir desde la api de datos
export const loaderBlog = async () => {
  const llamada = await fetch("https://jsonplaceholder.typicode.com/posts");
  const datosTraidos = await llamada.json();
  return { datosTraidos };
};
