import Bio from "./Bio";
import FacebookShare from "./icons/FacebookShare";
import LinkedInShare from "./icons/LinkedInShare";
import PropTypes from "prop-types";
import { siteMetadata } from "../site.config";
import TwitterShare from "./icons/TwitterShare";
import { A } from "./tags";

function Section({ children }) {
  return <section>{children}</section>;
}

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

function Heading({ children }) {
  return <h2>{children}</h2>;
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
    <footer>
      <Bio
        author={author}
        profilePhoto={profilePhoto}
        summary={summary}
        twitter={twitter}
      />
      <Section>
        <div>
          <Heading>Comparte el artículo</Heading>
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
        <p>
          As bisto une rata ?{" "}
          <A
            href={`https://github.com/MarcoMadera/Blog/edit/master/posts/${slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
            title="Edita el artículo en Github"
          >
            Edita el artículo
          </A>
        </p>
      </Section>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
        }
        p {
          margin: 0;
          font-size: 14px;
        }
        footer {
          grid-area: footer;
          margin-bottom: 20px;
        }
        footer :global(button) {
          background: none;
          border: none;
          box-sizing: content-box;
          cursor: pointer;
          height: 30px;
          margin: 9px;
          padding: 0;
          width: 30px;
        }
        footer :global(button:hover) {
          filter: brightness(1.1);
        }
        footer :global(h2) {
          font-size: 16px;
          margin: 0;
        }
        footer :global(section) {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        @media screen and (max-width: 528px) {
          footer :global(section div) {
            display: block;
          }
          footer :global(section div button:nth-of-type(1)) {
            margin-left: -10px;
          }
        }
        @media screen and (max-width: 876px) {
          footer :global(button) {
            margin: 0px;
            padding: 9px;
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
Heading.propTypes = {
  children: PropTypes.node.isRequired,
};
Section.propTypes = {
  children: PropTypes.node.isRequired,
};
