import { getSiteMetaData } from "../utils/helpers";
import styles from "./styles/Bio.module.css";
const Bio = () => {
  const { author, social } = getSiteMetaData();

  return (
    <section className={styles.Bio}>
      <img src="/profile.jpg" alt="Profile" />
      <p>
        Escrito por <b>{author.name}</b> {author.summary}{" "}
      </p>
      <a
        className={styles.tweet}
        href={`https://twitter.com/intent/follow?ref_src=twsrc%5Etfw&region=follow_link&screen_name=${social.twitter}&tw_p=followbutton`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Seguir
      </a>
    </section>
  );
};
export default Bio;
