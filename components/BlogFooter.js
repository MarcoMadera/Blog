import Bio from "./Bio";
import PropTypes from "prop-types";
import TwitterShare from "./icons/TwitterShare";
import FacebookShare from "./icons/FacebookShare";
import LinkedInShare from "./icons/LinkedInShare";
const BlogFooter = ({ slug, blogTitle }) => {
  return (
    <footer>
      <div>
        <strong>
          <p>Comparte el artículo</p>
        </strong>
        <button
          title="Compartir en Twitter"
          onClick={() => {
            window.open(
              `https://twitter.com/share?url=https://marcomadera.com/blog/${slug}&text=${blogTitle}`,
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
              `https://facebook.com/sharer/sharer.php?u=${`https://marcomadera.com/blog/${slug}&quote=${blogTitle}`}`,
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
              `http://www.linkedin.com/shareArticle?mini=true&url=${`https://marcomadera.com/blog/${slug}&title=${blogTitle}`}&source=marcomadera.com`,
              "popup",
              "width=600,height=500,scrollbars=no,resizable=no"
            );
            return false;
          }}
        >
          <LinkedInShare width={30} height={30} />
        </button>
      </div>
      <Bio />
      <style global jsx>{`
        .socialBtn {
          cursor: pointer;
          color: white !important;
          display: inline-block;
          text-decoration: none;
          height: 20px;
          border-radius: 3px;
          margin-right: 10px;
          font-weight: 500;
          padding: 1px 8px 1px 6px;
          font-weight: 500;
          font: normal normal normal 11px/18px "Helvetica Neue", Arial,
            sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-align: left;
          border: none;
        }
        .tweet {
          background-color: #1b95e0;
        }
      `}</style>
      <style jsx>{`
        button {
          background: none;
          border: none;
          cursor: pointer;
          box-sizing: content-box;
          padding: 9px;
          width: 30px;
          height: 30px;
        }
        div {
          display: flex;
          align-items: center;
        }
        p {
          margin: 0;
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
