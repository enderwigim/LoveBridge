import Image from "next/image";
import styles from './components/Home/Home.module.scss'


export default function Home() {
  return (
    <>
    {/* Sección principal */}
    <main className={`container my-5 ${styles.main}`}>
    <div className="row align-items-center">
      {/* Columna de texto */}
      <div className={`col-lg-6 ${styles.heroText}`}>
        <h1>Conecta tus emociones, estés donde estés</h1>
        <h2>Descubre la magia de sentirte cerca, incluso en la distancia</h2>
        <p>
          En LoveBridge, transformamos la distancia en oportunidad. Comparte momentos divertidos, crea rituales de pareja y mantén la chispa viva a golpe de clic. ¡Regístrate ahora y descubre cómo fortalecer tu relación sin importar cuántos kilómetros os separen!
        </p>
      </div>
      {/* Columna de imagen */}
      <div className="col-lg-6 text-center">
        <img 
          src="/img/pareja-feliz.png" 
          alt="Pareja a distancia feliz" 
          className="img-fluid rounded"
        />
      </div>
    </div>
  </main>
  </>
  );
}
