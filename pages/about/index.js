import Seo from "../../components/Seo";
import styles from "./About.module.css";
const About = () => {
  return (
    <main className={styles.container}>
      <Seo title="Sobre mí" />
      <h1>Sobre mí</h1>
      <p>
        ¡Hola! Mi nombre es Marco Madera tengo 23 años, actualmente soy auxiliar
        administrativo en la secretaria de relaciones exteriores, programador
        web frontend por afición y entusiasta de las tecnología web que cada día
        me apasionan más: JavaScript, Node.js, React, etc... Estoy en constante
        proceso de aprendizaje sobre las nuevas tecnologías y me gusta estar
        informado de lo que pasa en la web, ver cursos, leer artículos y
        tutoriales. Trataré de compartir mis conocimientos en la sección de
        blog, misma que trataré como libreta personal para futuro con temas
        relacionados a la programación.
      </p>
    </main>
  );
};

export default About;
