import PropTypes from "prop-types";
import styles from "./Bio.module.css";

export default function Bio({ author, profilePhoto, summary, twitter }) {
  return (
    <div className={styles.div}>
      <span>
        <img src={profilePhoto} alt={author} width="40" height="40" />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://twitter.com/intent/follow?ref_src=twsrc%5Etfw&region=follow_link&screen_name=${twitter}&tw_p=followbutton`}
        >
          Seguir
        </a>
      </span>
      <p>
        Escrito por{" "}
        <strong itemProp="author" translate="no">
          {author}
        </strong>{" "}
        {summary}{" "}
      </p>
    </div>
  );
}

Bio.propTypes = {
  author: PropTypes.node.isRequired,
  profilePhoto: PropTypes.string,
  summary: PropTypes.string,
  twitter: PropTypes.string,
};
