import Github from "./icons/Github";
import LinkedIn from "./icons/LinkedIn";
import Twitter from "./icons/Twitter";
import { siteMetadata } from "../site.config";
import { colors } from "../styles/theme";
import PropTypes from "prop-types";
import useDarkMode from "../hooks/useDarkMode";
function Anchor({ children, href, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  );
}

export default function Aside() {
  const { social } = siteMetadata;
  const { darkMode } = useDarkMode();

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
        <img
          draggable="false"
          className="twemoji"
          alt="👋"
          src="https://twemoji.maxcdn.com/v/13.0.2/72x72/1f44b.png"
          width="18"
          height="18"
        />{" "}
        Soy <span translate="no">Marco</span>, autor del blog. Gracias por
        pasarte, cualquier cosa me puedes contactar a través de las siguientes
        redes:
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
          box-shadow: ${darkMode
              ? "rgba(255,255,255,0.2)"
              : "rgba(0, 0, 0, 0.2)"}
            0px 0px 2px 0px;
        }
        aside :global(a:hover svg),
        aside :global(a:focus svg) {
          fill: ${darkMode ? colors.dark_secondary : colors.secondary};
        }
      `}</style>
      <style jsx>{`
        aside :global(.twemoji) {
          height: 1.1em;
          margin: 0 2px;
          vertical-align: -3px;
        }
        aside {
          border-radius: 12px;
          height: 300px;
          margin-top: 40px;
          padding: 20px;
          text-align: center;
          width: 100%;
        }
        aside :global(a) {
          display: inline-flex;
          box-sizing: border-box;
          margin: 0 10px;
        }
        
        img[alt="Marco Madera"] {
          clip-path: circle(50% at 50% 50%);
          height: 80px;
          width: 80px;
        }
        p {
          margin 1em 0;
        }
        picture {
          display: inline-flex;
        }
      `}</style>
    </aside>
  );
}

Anchor.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  label: PropTypes.string,
};
