import Bio from "./Bio";
import PropTypes from "prop-types";
const BlogFooter = ({ slug, blogTitle }) => {
  return (
    <footer>
      <button
        onClick={() => {
          window.open(
            `https://twitter.com/share?url=https://marcomadera.com/blog/${slug}&text=${blogTitle}`,
            "popup",
            "width=600,height=500,scrollbars=no,resizable=no"
          );
          return false;
        }}
        className="socialBtn tweet"
      >
        Tweet
      </button>
      <button
        onClick={() => {
          window.open(
            `https://facebook.com/sharer/sharer.php?u=${`https://marcomadera.com/blog/${slug}&quote=${blogTitle}`}`,
            "popup",
            "width=600,height=500,scrollbars=no,resizable=no"
          );
          return false;
        }}
        className="socialBtn share"
      >
        fb share
      </button>
      <button
        onClick={() => {
          window.open(
            `http://www.linkedin.com/shareArticle?mini=true&url=${`https://marcomadera.com/blog/${slug}&title=${blogTitle}`}&source=marcomadera.com`,
            "popup",
            "width=600,height=500,scrollbars=no,resizable=no"
          );
          return false;
        }}
        className="socialBtn shareLinkedIn"
      >
        in share
      </button>
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
        .share {
          background-color: #385898 !important;
        }
        .tweet {
          background-color: #1b95e0;
        }
        .shareLinkedIn {
          background-color: #0077b5;
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
