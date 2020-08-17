import styles from "./styles/Aside.module.css";
import Github from "./icons/Github";
import LinkedIn from "./icons/LinkedIn";
import Twitter from "./icons/Twitter";
import { siteMetadata } from "../site.config";
const Aside = () => {
  const { social } = siteMetadata;
  return (
    <aside className={styles.aside}>
      <img src="/profile.jpg" alt="profile" />
      <p>
        ¡Hola! 👋 Soy Marco, autor del blog. Gracias por pasarte, cualquier cosa
        me puedes contactar a través de las siguientes redes:
      </p>
      <a
        href={`https://github.com/${social.gitHub}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github fill="rgb(185,122,87)" />
      </a>
      <a
        href={`https://www.linkedin.com/in/${social.linkedIn}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedIn fill="rgb(185,122,87)" />
      </a>
      <a
        href={`https://twitter.com/${social.twitter}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter fill="rgb(185,122,87)" />
      </a>
    </aside>
  );
};

export default Aside;
