import { GithubSquare, LinkedInSquare, TwitterSquare } from "components/icons";
import { siteMetadata } from "site.config";
import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement } from "react";
import { A } from "components/tags";

export default function Aside(): ReactElement {
  const { social } = siteMetadata;
  const { darkMode } = useDarkMode();

  return (
    <aside>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/profile-80x80.jpg"
        alt="Marco Madera"
        placeholder="blur"
        loading="eager"
        width={80}
        height={80}
      />
      <p>
        ¡Hola! {/* eslint-disable-next-line @next/next/no-img-element */}
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
      <A
        href={`https://github.com/${social.gitHub}`}
        aria-label="Página de Github"
        title="Github"
      >
        <GithubSquare fill={darkMode ? colors.dark_primary : colors.primary} />
      </A>
      <A
        href={`https://www.linkedin.com/in/${social.linkedIn}`}
        aria-label="Página de LinkedIn"
        title="LinkedIn"
      >
        <LinkedInSquare
          fill={darkMode ? colors.dark_primary : colors.primary}
        />
      </A>
      <A
        href={`https://twitter.com/${social.twitter}`}
        aria-label="Página de Twitter"
        title="Twitter"
      >
        <TwitterSquare fill={darkMode ? colors.dark_primary : colors.primary} />
      </A>
      <style jsx>{`
        aside {
          box-shadow: ${darkMode
              ? "rgba(255,255,255,0.2)"
              : "rgba(0, 0, 0, 0.2)"}
            0px 0px 2px 0px;
          background: ${darkMode ? colors.dark_accents3 : colors.accents3};
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
        aside :global(img[alt="Marco Madera"]) {
          clip-path: circle(50% at 50% 50%);
        }
        p {
          margin 1em 0;
        }
      `}</style>
    </aside>
  );
}
