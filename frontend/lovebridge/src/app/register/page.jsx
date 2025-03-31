import Register from "../components/Register/register.jsx";

export default function PlanesPage() {
    return (
      <>
        <div className="container my-5">
            <h1 className="text-center">Registrarse</h1>
            <p className="text-center">Bienvenido de nuevo a LoveBridge. Inicia sesión para continuar.</p>
            <div className="d-flex justify-content-center">
            <Register/>
            </div>
        </div>
      </>
    )
  }