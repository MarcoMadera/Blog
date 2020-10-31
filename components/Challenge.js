import PropTypes from "prop-types";
const Challenge = ({
  title,
  liveDemo,
  challengePage,
  repo,
  challengeImg,
  todoList,
  level,
}) => {
  return (
    <article>
      <div>
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
        <p>
          <strong>Nivel en Frontend Mentor: {level}</strong>
        </p>
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
      </div>
      <div>
        <a href={liveDemo} rel="noopener noreferrer" target="_blank">
          <img src={challengeImg} alt={title} loading="lazy" />
        </a>
      </div>
      <style global jsx>{`
        .none {
          list-style-type: none;
        }
        main article:nth-child(2n + 3) div:nth-of-type(1) {
          order: 2;
        }
        @media screen and (max-width: 876px) {
          main article:nth-child(2n + 3) div:nth-of-type(1) {
            order: unset;
          }
        }
      `}</style>
      <style jsx>{`
        div:nth-of-type(1) a {
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
        div:nth-of-type(1) {
          padding: 40px;
        }
        img {
          width: 100%;
          max-width: 700px;
          margin: auto;
          clip-path: inset(0% 0% 0% 0% round 10px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08),
            0 10px 10px -5px rgba(0, 0, 0, 0.03);
        }
        div:nth-of-type(2) a {
          transition: ease 0.3s;
          display: flex;
        }
        div:nth-of-type(2) a:hover,
        div:nth-of-type(2) a:focus {
          position: static;
          transform: scale(1.1);
        }
        div:nth-of-type(1) a {
          margin-bottom: 10px;
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
          article > div:nth-of-type(1) {
            padding: 0px;
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
