import Github from "./icons/Github";
import LinkedIn from "./icons/LinkedIn";
import Twitter from "./icons/Twitter";
import { siteMetadata } from "../site.config";
const Aside = () => {
  const { social } = siteMetadata;
  return (
    <aside>
      <picture>
        <source srcSet="/profile-222x222.jpg" media="(max-width: 876px)" />
        <img src="/profile-80x80.jpg" alt="Profile" width="80" height="80" />
      </picture>
      <p>
        ¡Hola!{" "}
        <span role="img" aria-label="emoji waving hand">
          👋
        </span>{" "}
        Soy Marco, autor del blog. Gracias por pasarte, cualquier cosa me puedes
        contactar a través de las siguientes redes:
      </p>
      <a
        href={`https://github.com/${social.gitHub}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Github page"
      >
        <Github fill="#e74d3c" />
      </a>
      <a
        href={`https://www.linkedin.com/in/${social.linkedIn}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn page"
      >
        <LinkedIn fill="#e74d3c" />
      </a>
      <a
        href={`https://twitter.com/${social.twitter}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter page"
      >
        <Twitter fill="#e74d3c" />
      </a>
      <style jsx>{`
        aside {
          height: 300px;
          border-radius: 20px;
          background-color: white;
          box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.11);
          text-align: center;
          padding: 20px;
          width: 100%;
          margin-top: 40px;
        }
        a {
          display: inline-flex;
          box-sizing: border-box;
          margin: 0 10px;
        }
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      `}</style>
      <style global jsx>{`
        svg:hover {
          fill: #e74c3ccb;
        }
      `}</style>
    </aside>
  );
};

export default Aside;
