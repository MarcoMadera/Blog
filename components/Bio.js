import { colors } from "../styles/theme";
import PropTypes from "prop-types";

function P({ children }) {
  return <p>{children}</p>;
}

function Span({ children }) {
  return <span>{children}</span>;
}

function Anchor({ children, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Img({ alt, height, src, width }) {
  return <img src={src} alt={alt} width={width} height={height} />;
}

export default function Bio({ author, profilePhoto, summary, twitter }) {
  return (
    <div>
      <Span>
        <Img src={profilePhoto} alt={author} width="40" height="40" />
        <Anchor
          href={`https://twitter.com/intent/follow?ref_src=twsrc%5Etfw&region=follow_link&screen_name=${twitter}&tw_p=followbutton`}
        >
          Seguir
        </Anchor>
      </Span>
      <P>
        Escrito por{" "}
        <strong itemProp="author" translate="no">
          {author}
        </strong>{" "}
        {summary}{" "}
      </P>
      <style jsx>{`
        div {
          align-items: center;
          display: grid;
          grid-template-columns: auto 1fr;
          margin-top: 10px;
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
        div :global(a:hover),
        div :global(a:focus) {
          display: inline-block;
          margin-left: 0;
          margin-top: 20px;
          padding: 1px 5px 4px 4px;
          text-decoration: underline;
          width: 40px;
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
        div :global(p) {
          margin: 0;
        }
        div :global(span) {
          display: inline-flex;
          margin-right: 10px;
          position: relative;
          vertical-align: middle;
        }
        div :global(span:hover img + a),
        div :global(span:hover img:hover + a) {
          animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
          display: inline-block;
        }
        div :global(span:hover img + a) {
          width: 40px;
        }
        div :global(span:hover img:hover + a) {
          width: 44px;
        }
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
      `}</style>
    </div>
  );
}

Anchor.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};
Bio.propTypes = {
  author: PropTypes.node.isRequired,
  profilePhoto: PropTypes.string,
  summary: PropTypes.string,
  twitter: PropTypes.string,
};
Img.propTypes = {
  alt: PropTypes.string,
  height: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.string,
};
P.propTypes = {
  children: PropTypes.node,
};
Span.propTypes = {
  children: PropTypes.node,
};
