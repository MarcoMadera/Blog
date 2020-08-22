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
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>
              <a href={liveDemo} rel="noopener noreferrer" target="_blank">
                Live Demo
              </a>
            </th>
            <th>
              <a href={challengePage} rel="noopener noreferrer" target="_blank">
                Challenge
              </a>
            </th>
            <th>
              <a href={repo} rel="noopener noreferrer" target="_blank">
                Code
              </a>
            </th>
            <th>{level}</th>
          </tr>
        </thead>
      </table>
      <section></section>
      <img src={challengeImg} alt={title} />
      <span>Reto:</span>
      <ul>
        {todoList.map((todo, i) => {
          if (Array.isArray(todo)) {
            return (
              <li className="none">
                <ul key={i}>
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
      <hr />
      <style global jsx>{`
        .none {
          list-style-type: none;
        }
      `}</style>
      <style jsx>{`
        img {
          width: 100%;
          transition: ease 0.3s;
        }
        img:hover {
          position: static;
          transform: scale(1.1);
        }

        a {
          color: #da0000;
        }
        a:hover {
          text-decoration: underline;
          color: #e74c3ccb;
        }

        table {
          display: table;
          width: 100%;
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
};

export default Challenge;
