import styles from './Pricingcard.module.scss'

export default function PricingCard({ planTitle, planPrice, features, className }) {
    return (
      <div className={`card ${styles.planCard} ${className}`}>
        <div className="card-body d-flex flex-column text-center">
          <h2 className={styles.planTitle}>{planTitle}</h2>
          <p className={styles.planPrice}>{planPrice}</p>
          <ul className={`${styles.planFeatures} flex-grow-1`}>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <button className={`btn btn-outline ${styles.planButton}`}>Elegir Plan</button>
        </div>
      </div>
    );
  }