import Login from "../components/Login/login.jsx";

export default function PlanesPage() {
    return (
      <>
        <div className="container my-5">
          <h1 className="text-center">Iniciar Sesión</h1>
          <p className="text-center">Bienvenido de nuevo a LoveBridge. Inicia sesión para continuar.</p>
          <div className="d-flex justify-content-center">
            <Login/>
          </div>
        </div>
      </>
    )
  }