import styles from './Pricing.module.scss'

export default function Pricing() {
  return (
    <>
      <main className={`container my-5 ${styles.main}`}>
        <h1 className="text-center mb-5">Nuestros Planes</h1>
        <div className="row">
          {/* Plan Básico */}
          <div className="col-md-4">
            <div className={`card ${styles.planCard}`}>
              <div className="card-body text-center">
                <h2 className={styles.planTitle}>Básico</h2>
                <p className={styles.planPrice}>Gratis</p>
                <ul className={styles.planFeatures}>
                  <li>Acceso limitado</li>
                  <li>Perfil básico</li>
                  <li>Soporte comunitario</li>
                </ul>
                <button className={`btn btn-outline ${styles.planButton}`}>Elegir Plan</button>
              </div>
            </div>
          </div>
          {/* Plan Premium */}
          <div className="col-md-4">
            <div className={`card ${styles.planCard}`}>
              <div className="card-body text-center">
                <h2 className={styles.planTitle}>Premium</h2>
                <p className={styles.planPrice}>$9.99/mes</p>
                <ul className={styles.planFeatures}>
                  <li>Acceso ilimitado</li>
                  <li>Perfil completo</li>
                  <li>Soporte prioritario</li>
                </ul>
                <button className={`btn btn-outline ${styles.planButton}`}>Elegir Plan</button>
              </div>
            </div>
          </div>
          {/* Plan Gold */}
          <div className="col-md-4">
            <div className={`card ${styles.planCard}`}>
              <div className="card-body text-center">
                <h2 className={styles.planTitle}>Gold</h2>
                <p className={styles.planPrice}>$19.99/mes</p>
                <ul className={styles.planFeatures}>
                  <li>Todo lo Premium</li>
                  <li>Acceso a eventos exclusivos</li>
                  <li>Asesoría personalizada</li>
                </ul>
                <button className={`btn btn-outline ${styles.planButton}`}>Elegir Plan</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
