import Github from "./icons/Github";
import LinkedIn from "./icons/LinkedIn";
import Twitter from "./icons/Twitter";
import { siteMetadata } from "../site.config";
import { colors } from "../styles/theme";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "./Layout";
const Anchor = ({ href, label, children }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  );
};

const Aside = () => {
  const { social } = siteMetadata;
  const { darkMode } = useContext(ThemeContext);
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
        <Github fill={darkMode ? colors.dark_primary : colors.primary} />
      </Anchor>
      <Anchor
        href={`https://www.linkedin.com/in/${social.linkedIn}`}
        label="Página de LinkedIn"
      >
        <LinkedIn fill={darkMode ? colors.dark_primary : colors.primary} />
      </Anchor>
      <Anchor
        href={`https://twitter.com/${social.twitter}`}
        label="Página de Twitter"
      >
        <Twitter fill={darkMode ? colors.dark_primary : colors.primary} />
      </Anchor>
      <style jsx>{`
        aside {
          border-radius: 12px;
          box-shadow: ${
            darkMode ? "rgba(255,255,255,0.2)" : "rgba(0, 0, 0, 0.2)"
          }
            0px 0px 2px 0px;
          height: 300px;
          margin-top: 40px;
          padding: 20px;
          text-align: center;
          width: 100%;
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
          fill: ${darkMode ? colors.dark_secondary : colors.secondary};
        }
        picture {
          display: inline-flex;
        }
        img {
          clip-path: circle(50% at 50% 50%);
          height: 80px;
          width: 80px;
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
