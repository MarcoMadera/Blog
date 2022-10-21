import { GithubSquare, LinkedInSquare, TwitterSquare } from "components/icons";
import { siteMetadata } from "site.config";
import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement } from "react";
import { SocialAnchor } from "./SocialAnchor";

export default function Aside(): ReactElement {
  const { social } = siteMetadata;
  const { darkMode } = useDarkMode();

  return (
    <header className="h-card">
      <div>
        <h1>
          <span translate="no" className="p-name site-title">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              draggable="false"
              className="twemoji-1"
              alt="👋"
              src="https://twemoji.maxcdn.com/v/13.0.2/72x72/1f44b.png"
              width="36"
              height="36"
            />{" "}
            Marco Madera
          </span>
        </h1>
        <p className="p-summary site-description p-note">
          Este es mi sitio personal, escribo sobre frontend y experiencias para
          crear más valor a la comunidad web.
        </p>
        <div className="social">
          <SocialAnchor
            socialTarget={`https://github.com/${social.gitHub}`}
            socialNetwork="GitHub"
          >
            <GithubSquare
              fill={darkMode ? colors.dark_primary : colors.primary}
            />
          </SocialAnchor>
          <SocialAnchor
            socialTarget={`https://www.linkedin.com/in/${social.linkedIn}`}
            socialNetwork="LinkedIn"
          >
            <LinkedInSquare
              fill={darkMode ? colors.dark_primary : colors.primary}
            />
          </SocialAnchor>
          <SocialAnchor
            socialTarget={`https://twitter.com/${social.twitter}`}
            socialNetwork="Twitter"
          >
            <TwitterSquare
              fill={darkMode ? colors.dark_primary : colors.primary}
            />
          </SocialAnchor>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/profile-222x222.jpg"
        alt="Marco Madera"
        className="profile-photo u-photo"
        loading="eager"
        width={222}
        height={222}
      />
      <style jsx>{`
        header :global(a:hover svg),
        header :global(a:focus svg) {
          fill: ${darkMode ? colors.dark_secondary : colors.secondary};
        }
      `}</style>
      <style jsx>{`
        header :global(img) {
          border-radius: 50%;
          margin-bottom: 20px;
          max-width: 100%;
        }
        header :global(a) {
          display: inline-flex;
          box-sizing: border-box;
          margin: 0 10px;
        }
        h1 {
          font-size: 1.6rem;
          font-weight: 400;
          line-height: 1.5;
          margin: 0;
          color: ${darkMode ? "#ccccccaa" : colors.accents1};
        }
        h1 :global(span) {
          color: ${darkMode ? colors.dark_primary : colors.primary};
          font-size: 2rem;
        }
        p {
          font-size: 1.1rem;
          line-height: 1.8;
        }
        header :global(.twemoji-1) {
          height: 38px;
          margin: 0 2px;
          vertical-align: top;
        }
        header {
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex-direction: row;
          justify-content: space-between;
          background-color: ${darkMode
            ? colors.dark_background
            : colors.background};
          border-radius: 10px;
          margin-bottom: 20px;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 40px;
          gap: 20px;
        }

        @media (max-width: 604px) {
          header {
            flex-direction: column;
            padding: 20px;
            flex-direction: column-reverse;
          }
          .profile-photo {
            width: 120px;
            height: 120px;
          }
          .social {
            display: flex;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
}
