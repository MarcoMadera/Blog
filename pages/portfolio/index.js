import Seo from "../../components/Seo";
import styles from "./Portfolio.module.css";
const Portfolio = () => {
  return (
    <main className={styles.container}>
      <Seo title="Portafolio" />
      <h1>Aqui irá mi portafolio</h1>
      <p>Hola soy Marco Madera</p>
    </main>
  );
};

export default Portfolio;
