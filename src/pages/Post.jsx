import { Link, useLoaderData } from "react-router-dom";

const Post = () => {
  const { postRecibido } = useLoaderData();
  console.log(postRecibido);

  return (
    <>
      {}

      <h1>
        {postRecibido.id} {postRecibido.title}{" "}
      </h1>
      <p>{postRecibido.body}</p>
      <Link className="btn btn-dark mb-2" to="/blog">
        volver
      </Link>
    </>
  );
};

export default Post;

export const loaderPosts = async ({ params }) => {
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  //en las promises el catch lo tira react automaticamente, solo hago el twrow
  if (!data.ok)
    throw {
      data: "Post no encontrado",
      //statusText: "Codigo del error: " + data.status,
    };

  const postRecibido = await data.json();
  return { postRecibido };
};
