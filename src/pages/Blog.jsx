//Acá voy a usar el HOOK UseLoaderData para traerme lo que devuelva la llamada de los post del blog y lo voy a usar para determinar que ese resultado va a ser el array que consumo

import { useLoaderData } from "react-router-dom";

const Blog = () => {


    {/*Entre comillas le tengo que pasar si o si el mismo nombre del objeto que exporté en la funcion ASYNC de consulta a la API*/}
    const { datosTraidos } = useLoaderData();
    console.log(datosTraidos)

  return (
    <>
      <h1>Blog</h1>;
      <div>
        <ul className="list-group">{
            
            datosTraidos.map ( datos => (
                <li key={datos.id} className="list-group-item">{datos.id} {datos.title} </li>
            ))
            
            }</ul>
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
