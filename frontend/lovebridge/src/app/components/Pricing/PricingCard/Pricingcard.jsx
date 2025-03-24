export default function PricingCard({ planTitle, planPrice, features}) {
    return (

        <div className={`card ${styles.planCard}`}>
            <div className="card-body text-center">
                <h2 className={styles.planTitle}>{planTitle}</h2>
                <p className={styles.planPrice}>{planPrice}</p>
                <ul className={styles.planFeatures}>
                    {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                    ))}
                </ul>
                <button className={`btn btn-outline ${styles.planButton}`}>Elegir Plan</button>
            </div>
        </div>
    );
}