import Github from "./icons/Github";
import LinkedIn from "./icons/LinkedIn";
import Twitter from "./icons/Twitter";
import { siteMetadata } from "../site.config";
import { colors } from "../styles/theme";
import PropTypes from "prop-types";

const Anchor = ({ href, label, children }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  );
};

const Aside = () => {
  const { social } = siteMetadata;
  return (
    <aside>
      <picture>
        <source srcSet="/profile-222x222.jpg" media="(max-width: 876px)" />
        <img
          src="/profile-80x80.jpg"
          alt="Marco Madera"
          width="80"
          loading="eager"
          height="80"
        />
      </picture>
      <p>
        ¡Hola!{" "}
        <span role="img" aria-label="emoji mano saludando">
          👋
        </span>{" "}
        Soy Marco, autor del blog. Gracias por pasarte, cualquier cosa me puedes
        contactar a través de las siguientes redes:
      </p>
      <Anchor
        href={`https://github.com/${social.gitHub}`}
        label="Página de Github"
      >
        <Github fill={colors.primary} />
      </Anchor>
      <Anchor
        href={`https://www.linkedin.com/in/${social.linkedIn}`}
        label="Página de LinkedIn"
      >
        <LinkedIn fill={colors.primary} />
      </Anchor>
      <Anchor
        href={`https://twitter.com/${social.twitter}`}
        label="Página de Twitter"
      >
        <Twitter fill={colors.primary} />
      </Anchor>
      <style jsx>{`
        aside {
          height: 300px;
          border-radius: 12px;
          background-color: ${colors.white};
          box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 2px 0px;
          text-align: center;
          padding: 20px;
          width: 100%;
          margin-top: 40px;
        }
        p {
          margin 1em 0;
        }
        aside :global(a) {
          display: inline-flex;
          box-sizing: border-box;
          margin: 0 10px;
        }
        aside :global(a:hover svg),
        aside :global(a:focus svg) {
          fill: ${colors.secondary};
        }
        picture {
          display: inline-flex;
        }
        img {
          width: 80px;
          height: 80px;
          clip-path: circle(50% at 50% 50%);
        }
      `}</style>
    </aside>
  );
};

Anchor.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
};

export default Aside;
