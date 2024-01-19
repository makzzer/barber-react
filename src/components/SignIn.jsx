import React from "react";

const SignIn = () => {
  const handleSignIn = (e) => {
    e.preventDefault();
    // Add your sign-in logic here
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form className="bg-light shadow-md rounded p-4 mt-4 min-w-[20rem] md:w-[20rem]">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="email" />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" />
        </div>

        <div className="mb-3">
          <button
            onClick={handleSignIn}
            className="btn btn-dark w-100"
            type="submit"
          >
            Ingresar
          </button>
        </div>

        <div className="text-center">
          <button className="btn btn-danger w-100 mb-2" type="button">
            Ingresa con Google
          </button>
          <button className="btn btn-primary w-100" type="button">
            Ingresa con Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
