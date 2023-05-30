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
          {datosTraidos.length > 0 ? (
            datosTraidos.map((dato) => (
              <li key={dato.id} className="list-group-item">
                <Link to={`/blog/${dato.id}`}>
                  {dato.id} {dato.title}
                </Link>
              </li>
            ))
          ) : (
            <li>datos no encontrados</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Blog;

//voy a crear una funcion asincrona para consumir desde la api de datos
export const loaderBlog = async () => {
  const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts");
  console.log(respuesta.status)

  //para capturar el error en caso de que la solicitud falle
  //en las promises el catch lo tira react automaticamente, solo hago el twrow
  //tengo que usar el respuesta.status===404 porque el respuesta.ok probablemente me esté devolviendo true
  if (respuesta.status==404)
    throw {
      //data: "No se pudo acceder al elemento de la API",
      statusText: "Codigo del error: " + respuesta.status,
    };


  //si no falla, que me la pase a json y me la devuelva
  const datosTraidos = await respuesta.json();
  console.log(respuesta);

  return { datosTraidos };
};
