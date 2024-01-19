import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add your sign-up logic here
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form className="bg-light shadow-md rounded p-4 mt-4 min-w-[20rem] md:w-[20rem]">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <button
            onClick={handleSignUp}
            className="btn btn-secondary w-100"
            type="submit"
          >
            Registrarse
          </button>
        </div>

        <div className="text-center">
          <button className="btn btn-danger w-100 mb-2" type="button">
            Registrate con Google
          </button>
          <button className="btn btn-primary w-100" type="button">
            Registrate con Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
