import { getSiteMetaData } from "../utils/helpers";
import styles from "./styles/Bio.module.css";
const Bio = () => {
  const { author, social } = getSiteMetaData();

  return (
    <section className={styles.Bio}>
      <img src="/profile.jpg" alt="Profile" />
      <p>
        Escrito por <b>{author.name}</b> {author.summary}{" "}
        <a href={`https://twitter.com/${social.twitter}`}>Sigueme en twitter</a>
      </p>
    </section>
  );
};
export default Bio;
