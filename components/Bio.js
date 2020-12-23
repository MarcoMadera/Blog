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
          margin-right: 10px;
          position: relative;
        }
        div {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }
        div :global(img) {
          clip-path: inset(0% round 10px);
          height: 40px;
          transition: 0.3s ease;
          width: 40px;
        }
        div :global(img:hover) {
          transform: scale(1.1);
        }
        div :global(span:hover img + a) {
          animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
          display: inline-block;
          width: 40px;
        }
        div :global(span:hover img:hover + a) {
          animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
          display: inline-block;
          width: 44px;
        }
        div :global(a) {
          background-color: ${colors.twitter};
          border: none;
          border-radius: 0px 0px 10px 10px;
          box-sizing: border-box;
          color: ${colors.background} !important;
          cursor: pointer;
          display: none;
          font: normal normal normal 11px/18px "Helvetica Neue", Arial,
            sans-serif;
          font-weight: 600;
          height: 20px;
          margin-left: -2px;
          margin-top: 22px;
          padding: 1px 7px 1px 6px;
          outline: 0;
          overflow: hidden;
          position: absolute;
          text-align: left;
          transition: 0.3s ease;
          white-space: nowrap;
          width: 40px;
        }
        div :global(a:hover) {
          display: inline-block;
          margin-left: 0;
          margin-top: 20px;
          padding: 1px 5px 4px 4px;
          text-decoration: underline;
          width: 40px;
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
