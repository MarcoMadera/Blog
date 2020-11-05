import Bio from "./Bio";
import PropTypes from "prop-types";
import TwitterShare from "./icons/TwitterShare";
import FacebookShare from "./icons/FacebookShare";
import LinkedInShare from "./icons/LinkedInShare";
import { siteMetadata } from "../site.config";
const BlogFooter = ({ slug, data }) => {
  return (
    <footer>
      <section>
        <h2>Comparte el artículo</h2>
        <button
          title="Compartir en Twitter"
          onClick={() => {
            window.open(
              `https://twitter.com/share?url=${siteMetadata.siteUrl}/${slug}&text=${data.title}`,
              "popup",
              "width=600,height=500,scrollbars=no,resizable=no"
            );
            return false;
          }}
        >
          <TwitterShare width={30} height={30} />
        </button>
        <button
          title="Compartir en Facebook"
          onClick={() => {
            window.open(
              `https://facebook.com/sharer/sharer.php?u=${`${siteMetadata.siteUrl}/blog/${slug}&quote=${blogTitle}`}`,
              "popup",
              "width=600,height=500,scrollbars=no,resizable=no"
            );
            return false;
          }}
        >
          <FacebookShare width={30} height={30} />
        </button>
        <button
          title="Compartir en LinkedIn"
          onClick={() => {
            window.open(
              `http://www.linkedin.com/shareArticle?mini=true&url=${`${siteMetadata.siteUrl}/blog/${slug}`}&title=${blogTitle}&source=${
                siteMetadata.siteUrl
              }`,
              "popup",
              "width=600,height=500,scrollbars=no,resizable=no"
            );
            return false;
          }}
        >
          <LinkedInShare width={30} height={30} />
        </button>
      </section>
      <Bio data={data} />
      <style jsx>{`
        button {
          background: none;
          border: none;
          cursor: pointer;
          box-sizing: content-box;
          margin: 9px;
          padding: 0;
          width: 30px;
          height: 30px;
        }
        section {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }
        h2 {
          margin: 0;
          font-size: 16px;
        }
        @media screen and (max-width: 528px) {
          section {
            display: block;
          }
        }
        @media screen and (max-width: 876px) {
          button {
            padding: 9px;
            margin: 0px;
          }
        }
        @media print {
          footer {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
};

BlogFooter.propTypes = {
  loaded: PropTypes.bool,
  slug: PropTypes.string,
  blogTitle: PropTypes.string,
};

export default BlogFooter;
