import PropTypes from "prop-types";
import { colors } from "../styles/theme";
const Challenge = ({
  title,
  liveDemo,
  challengePage,
  repo,
  challengeImg,
  todoList,
  level,
  change,
}) => {
  return (
    <article>
      <section className={change ? "changeOrder" : ""}>
        <h2>{title}</h2>
        <a
          href={liveDemo}
          rel="noopener noreferrer"
          target="_blank"
          className="btn btn-primary"
        >
          Ver en vivo
        </a>
        <a
          href={challengePage}
          rel="noopener noreferrer"
          target="_blank"
          className="btn btn-primary"
        >
          Página del reto
        </a>
        <a
          href={repo}
          rel="noopener noreferrer"
          target="_blank"
          className="btn btn-primary"
        >
          Código
        </a>
        <strong>
          <p>Nivel en Frontend Mentor: {level}</p>
        </strong>
        <span>Reto:</span>
        <ul>
          {todoList.map((todo, i) => {
            if (Array.isArray(todo)) {
              return (
                <li key={i} className="none">
                  <ul>
                    {todo.map((subtodo, i) => (
                      <li key={i}>{subtodo}</li>
                    ))}
                  </ul>
                </li>
              );
            } else {
              return <li key={i}>{todo}</li>;
            }
          })}
        </ul>
      </section>
      <div>
        <a href={liveDemo} rel="noopener noreferrer" target="_blank">
          <img src={challengeImg} alt={title} loading="lazy" />
        </a>
      </div>
      <style global jsx>{`
        .none {
          list-style-type: none;
        }
        .changeOrder {
          order: 2;
        }
        @media screen and (max-width: 876px) {
          .changeOrder {
            order: unset;
          }
        }
      `}</style>
      <style jsx>{`
        section a {
          margin-right: 20px;
        }
        article {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-top: 40px;
          margin-bottom: 40px;
          align-items: center;
        }
        article > div {
          padding: 40px;
        }
        section {
          padding: 40px;
        }
        img {
          width: 100%;
          transition: ease 0.3s;
          border-radius: 10px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08),
            0 10px 10px -5px rgba(0, 0, 0, 0.03);
        }
        img:hover {
          position: static;
          transform: scale(1.1);
        }

        a {
          color: ${colors.primary};
        }
        a:hover {
          text-decoration: underline;
          color: ${colors.secondary};
        }
        @media screen and (max-width: 876px) {
          article {
            grid-template-columns: auto;
          }
          article {
            margin-top: 0px;
            margin-bottom: 20px;
          }
          article > div,
          article > section {
            padding: 0px;
          }
          section a {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </article>
  );
};

Challenge.propTypes = {
  title: PropTypes.string,
  liveDemo: PropTypes.string,
  challengePage: PropTypes.string,
  repo: PropTypes.string,
  challengeImg: PropTypes.string,
  todoList: PropTypes.array,
  level: PropTypes.string,
  change: PropTypes.bool,
};

export default Challenge;
