import Bio from "./Bio";
import PropTypes from "prop-types";
import TwitterShare from "./icons/TwitterShare";
import FacebookShare from "./icons/FacebookShare";
import LinkedInShare from "./icons/LinkedInShare";
import { siteMetadata } from "../site.config";

const Section = ({ children }) => <section>{children}</section>;

const Button = ({ url, network, children }) => (
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

const Heading = ({ children }) => <h2>{children}</h2>;

const BlogFooter = ({
  slug,
  title,
  profilePhoto,
  twitter,
  author,
  summary,
}) => {
  return (
    <footer>
      <Section>
        <Heading>Comparte el artículo</Heading>
        <Button
          network="Twitter"
          url={`https://twitter.com/share?url=${siteMetadata.siteUrl}/${slug}&text=${title}`}
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
      </Section>
      <Bio
        profilePhoto={profilePhoto}
        twitter={twitter}
        author={author}
        summary={summary}
      />
      <style jsx>{`
        footer :global(button) {
          background: none;
          border: none;
          cursor: pointer;
          box-sizing: content-box;
          margin: 9px;
          padding: 0;
          width: 30px;
          height: 30px;
        }
        footer :global(section) {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }
        footer :global(h2) {
          margin: 0;
          font-size: 16px;
        }
        @media screen and (max-width: 528px) {
          footer :global(section) {
            display: block;
          }
        }
        @media screen and (max-width: 876px) {
          footer :global(button) {
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
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  profilePhoto: PropTypes.string,
  twitter: PropTypes.string,
  author: PropTypes.string.isRequired,
  summary: PropTypes.string,
};
Section.propTypes = {
  children: PropTypes.node.isRequired,
};
Button.propTypes = {
  url: PropTypes.string,
  network: PropTypes.string,
  children: PropTypes.node,
};
Heading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlogFooter;
