import Bio from "./Bio";
import FacebookShare from "components/icons/FacebookShare";
import LinkedInShare from "components/icons/LinkedInShare";
import PropTypes from "prop-types";
import { siteMetadata } from "site.config";
import TwitterShare from "components/icons/TwitterShare";
import { A } from "components/tags";
import styles from "./BlogFooter.module.css";

function Button({ url, network, children }) {
  return (
    <button
      title={`Compartir en ${network}`}
      onClick={() => {
        window.open(
          `${url}`,
          "popup",
          "width=600,height=500,scrollbars=no,resizable=no"
        );
        return false;
      }}
    >
      {children}
    </button>
  );
}

export default function BlogFooter({
  author,
  profilePhoto,
  slug,
  summary,
  title,
  twitter,
}) {
  return (
    <footer className={styles.footer}>
      <Bio
        author={author}
        profilePhoto={profilePhoto}
        summary={summary}
        twitter={twitter}
      />
      <section>
        <div>
          <h2>Comparte el artículo</h2>
          <Button
            network="Twitter"
            url={`https://twitter.com/share?url=${siteMetadata.siteUrl}/blog/${slug}&text=${title}`}
          >
            <TwitterShare width={30} height={30} />
          </Button>
          <Button
            network="Facebook"
            url={`https://facebook.com/sharer/sharer.php?u=${`${siteMetadata.siteUrl}/blog/${slug}&quote=${title}`}`}
          >
            <FacebookShare width={30} height={30} />
          </Button>
          <Button
            network="LinkedIn"
            url={`http://www.linkedin.com/shareArticle?mini=true&url=${`${siteMetadata.siteUrl}/blog/${slug}`}&title=${title}&source=${
              siteMetadata.siteUrl
            }`}
          >
            <LinkedInShare width={30} height={30} />
          </Button>
        </div>
        <p className={styles.p}>
          {/* Esta línea está "mal escrita" a propósito en modo irónico.*/}
          <span translate="no" data-nosnippet>
            As bisto une rata ?
          </span>{" "}
          <A
            href={`https://github.com/MarcoMadera/Blog/edit/master/posts/${slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
            title="Edita el artículo en Github"
          >
            Edita el artículo
          </A>
        </p>
      </section>
    </footer>
  );
}

BlogFooter.propTypes = {
  author: PropTypes.string.isRequired,
  profilePhoto: PropTypes.string,
  slug: PropTypes.string.isRequired,
  summary: PropTypes.string,
  title: PropTypes.string.isRequired,
  twitter: PropTypes.string,
};
Button.propTypes = {
  children: PropTypes.node,
  network: PropTypes.string,
  url: PropTypes.string,
};
