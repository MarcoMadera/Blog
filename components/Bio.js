import { colors } from "../styles/theme";
import PropTypes from "prop-types";

const P = ({ children }) => <p>{children}</p>;

const Span = ({ children }) => <span>{children}</span>;

const Anchor = ({ children, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const Img = ({ src, alt, width, height }) => (
  <img src={src} alt={alt} width={width} height={height} />
);

const Bio = ({ profilePhoto, twitter, author, summary }) => {
  return (
    <div>
      <P>
        <Span>
          <Img src={profilePhoto} alt={author} width="40" height="40" />
          <Anchor
            href={`https://twitter.com/intent/follow?ref_src=twsrc%5Etfw&region=follow_link&screen_name=${twitter}&tw_p=followbutton`}
          >
            Seguir
          </Anchor>
        </Span>
        Escrito por <strong itemProp="author">{author}</strong> {summary}{" "}
      </P>
      <style jsx>{`
        @keyframes scale-in-center {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        div :global(p) {
          margin-top: 0;
        }
        div :global(span) {
          display: inline-flex;
          vertical-align: middle;
        }
        div {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }
        div :global(img) {
          width: 40px;
          height: 40px;
          margin: 0 10px 0 0 !important;
          clip-path: inset(0% round 10px);
        }
        div :global(img:hover) {
          transform: scale(1.1);
        }
        div :global(span:hover a) {
          display: inline-block;
          animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
        }
        div :global(img:hover + a) {
          padding: 1px 7px 1px 6px;
          margin-left: -2px;
          margin-top: 22px;
        }
        div :global(a) {
          margin-top: 20px;
          position: absolute;
          border: none;
          height: 20px;
          box-sizing: border-box;
          padding: 1px 5px 1px 4px;
          background-color: ${colors.twitter};
          color: ${colors.white} !important;
          border-radius: 3px 3px 10px 10px;
          font-weight: 600;
          cursor: pointer;
          outline: 0;
          display: none;
          white-space: nowrap;
          overflow: hidden;
          text-align: left;
          font: normal normal normal 11px/18px "Helvetica Neue", Arial,
            sans-serif;
          transition: 0.3s ease;
        }
        div :global(a:hover) {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

Bio.propTypes = {
  profilePhoto: PropTypes.string,
  twitter: PropTypes.string,
  summary: PropTypes.string,
  author: PropTypes.node.isRequired,
};
P.propTypes = {
  children: PropTypes.node,
};
Span.propTypes = {
  children: PropTypes.node,
};
Anchor.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};
Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
export default Bio;
