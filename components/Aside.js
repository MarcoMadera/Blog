import Github from "./icons/Github";
import LinkedIn from "./icons/LinkedIn";
import Twitter from "./icons/Twitter";
import { siteMetadata } from "../site.config";
const Aside = () => {
  const { social } = siteMetadata;
  return (
    <aside>
      <img src="/profile.jpg" alt="profile" />
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
      >
        <Github fill="#e74c3c" />
      </a>
      <a
        href={`https://www.linkedin.com/in/${social.linkedIn}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedIn fill="#e74c3c" />
      </a>
      <a
        href={`https://twitter.com/${social.twitter}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter fill="#e74c3c" />
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

        img {
          border: 3px solid black;
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      `}</style>
      <style global jsx>{`
        svg {
          margin: 0 10px;
        }
        svg:hover {
          fill: #e74c3ccb;
        }
      `}</style>
    </aside>
  );
};

export default Aside;
