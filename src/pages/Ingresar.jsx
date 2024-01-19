import SignIn from "../components/SignIn";

import SignUp from "../components/SignUp";

const Ingresar = () => {
  return (
    <>
      <div className="d-flex align-items-center gap-5 justify-content-center">
        <div className="row">
          <div className="col-sm-6">
            <h3 className="mt-4">¿Ya tenés cuenta?</h3>
            <h5 className="text-secondary">Inicia sesión</h5>
            <SignIn />
          </div>
          <div className="col-sm-6">
            <h3 className="mt-4">¿Primera vez por acá?</h3>
            <h5 className="text-secondary">Crea tu Cuenta</h5>
            <SignUp />
          </div>
        </div>
      </div>
    </>
  );
};

export default Ingresar;
