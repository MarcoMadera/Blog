import { colors } from "styles/theme";
import Link from "next/link";
import { siteMetadata } from "site.config";
import useDarkMode from "hooks/useDarkMode";
import { TwitterSquare, LinkedInSquare, GithubSquare } from "./icons";
import { ReactElement } from "react";
import { A } from "components/tags";
import { SocialAnchor } from "layouts/Home/SocialAnchor";

export default function Footer(): ReactElement {
  const { darkMode } = useDarkMode();
  const { social } = siteMetadata;

  return (
    <footer>
      <section>
        <div className="footer_section">
          <strong>Navegación</strong>
          <Link prefetch={false} href="/">
            <a>Inicio</a>
          </Link>
          <Link prefetch={false} href="/portafolio">
            <a>Portafolio</a>
          </Link>
          <Link prefetch={false} href="/sobre-mi">
            <a>Sobre mí</a>
          </Link>
          <Link prefetch={false} href="/newsletter">
            <a>Newsletter</a>
          </Link>
        </div>
        <div className="footer_section">
          <strong>Legal</strong>
          <Link prefetch={false} href="/cookies">
            <a>Política de cookies</a>
          </Link>
          <Link prefetch={false} href="/privacidad">
            <a>Privacidad</a>
          </Link>
          <A
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.es"
            target="_blank"
            rel="license noopener noreferrer"
          >
            Licencia
          </A>
        </div>
        <div className="footer_section">
          <strong>Enlaces externos</strong>
          <A
            href="https://blog.marcomadera.com/"
            target="_blank"
            rel="external noopener noreferrer"
          >
            Blog
          </A>
          <A
            href="https://github.com/MarcoMadera/Blog"
            target="_blank"
            rel="external noopener noreferrer"
          >
            Código fuente
          </A>
          <A
            href="https://old.marcomadera.com/"
            target="_blank"
            rel="external noopener noreferrer"
          >
            Sitio antiguo
          </A>
          <A
            href={`${siteMetadata.siteUrl}/rss.xml`}
            target="_blank"
            rel="external noopener noreferrer"
          >
            RSS
          </A>
          <A
            href={"https://status.marcomadera.com"}
            target="_blank"
            rel="external noopener noreferrer"
          >
            Status
          </A>
        </div>
        <div className="footer_section ">
          <strong>Social</strong>
          <div className="footer_social">
            <SocialAnchor
              socialTarget={`https://twitter.com/${social.twitter}`}
              socialNetwork="Twitter"
            >
              <TwitterSquare
                width={28}
                height={28}
                fill={darkMode ? colors.dark_primary : colors.primary}
              />
            </SocialAnchor>
            <SocialAnchor
              socialTarget={`https://www.linkedin.com/in/${social.linkedIn}`}
              socialNetwork="LinkedIn"
            >
              <LinkedInSquare
                width={28}
                height={28}
                fill={darkMode ? colors.dark_primary : colors.primary}
              />
            </SocialAnchor>
            <SocialAnchor
              socialTarget={`https://github.com/${social.gitHub}`}
              socialNetwork="GitHub"
            >
              <GithubSquare
                width={28}
                height={28}
                fill={darkMode ? colors.dark_primary : colors.primary}
              />
            </SocialAnchor>
          </div>
          <div>
            <span translate="no">Marco Madera &copy; 2020 - 2022</span>
          </div>
        </div>
      </section>
      <style jsx>{`
        .footer_social :global(a:hover svg),
        .footer_social :global(a:focus svg) {
          fill: ${darkMode ? colors.dark_secondary : colors.secondary};
        }
        footer {
          background: ${darkMode ? colors.dark_accents3 : colors.accents3};
        }
        strong {
          color: ${darkMode ? colors.dark_titleColor : colors.titleColor};
        }
        .footer_section {
          color: ${darkMode ? colors.dark_textColor : colors.titleColor};
        }
        .footer_section > :global(a:after) {
          background: ${darkMode ? colors.dark_secondary : colors.primary};
        }
      `}</style>
      <style jsx>{`
        strong {
          display: block;
          margin: 15px 0 22px;
        }
        section {
          display: flex;
          flex-wrap: wrap;
          margin: 0 auto;
          grid-gap: 30px;
          max-width: 1000px;
          justify-content: space-between;
        }
        .footer_section :global(a) {
          display: block;
          width: max-content;
          padding: 0.1875rem 0;
          margin-bottom: 0.75em;
          color: inherit;
          text-decoration: none;
          position: relative;
        }
        .footer_section > :global(a:after) {
          bottom: -1px;
          content: "";
          display: block;
          height: 2px;
          left: 50%;
          position: absolute;
          transition: width 0.15s ease 0s, left 0.1s ease 0s;
          width: 0;
          margin-top: 15px;
        }
        .footer_section > :global(a:hover:after),
        .footer_section > :global(a:focus:after) {
          width: 100%;
          left: 0;
        }
        .footer_social {
          display: flex;
        }
        .footer_social :global(a) {
          margin-right: 20px;
          display: inline-flex;
        }
        footer {
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          min-height: 80px;
          padding: 60px 20px 40px;
        }
        span {
          display: inline-flex;
        }
        @media screen and (min-width: 0px) and (max-width: 500px) {
          section {
            display: block;
            text-align: center;
          }
          .footer_section :global(a) {
            margin: 10px auto;
          }
          .footer_social {
            justify-content: center;
            margin-bottom: 20px;
          }
          .footer_social :global(a) {
            margin: 0 5px;
          }
        }
      `}</style>
    </footer>
  );
}
