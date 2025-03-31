import styles from './Pricing.module.scss'
import PricingCard from './PricingCard/Pricingcard';

export default function Pricing() {
  // Datos estaticos de ejemplo de los planes
  const pricingData = [
    {
      planTitle: "Básico",
      planPrice: "Gratis",
      features: [
        "Acceso limitado",
        "Perfil básico",
        "Soporte comunitario",
        "Anuncios"
      ]
    },
    {
      planTitle: "Conexión Completa",
      planPrice: "$39,99/año",
      features: [
        "Acceso ilimitado",
        "Perfil completo",
        "Soporte prioritario",
        "Sin anuncios",
      ]
    },
    {
      planTitle: "Amor sin límites",
      planPrice: "$49.99/mes",
      features: [
        "Todo lo Premium",
        "Acceso a eventos exclusivos",
        "Asesoría personalizada",
        "Calendario interactivo",
        "Descuentos en sesiones con profesionales"
      ]
    }
  ];


  return (
    <>
      <main className={`container my-5 ${styles.main}`}>
        <h1 className="text-center mb-5">Nuestros Planes</h1>
        <div className="row">
          {pricingData.map((plan, index) => (
          <div className='col-md-4' key={index}>

            <PricingCard className={`h-100`}
              planTitle={plan.planTitle}
              planPrice={plan.planPrice}
              features={plan.features}
            />


          </div>
        ))}
        </div>
      </main>
    </>
  )
}
